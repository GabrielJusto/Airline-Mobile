import AsyncStorage from '@react-native-async-storage/async-storage';
import { ApiClient, api } from "@/services/api";

const SESSION_STORAGE_KEY = "airline.session";

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface LoginResponse {
    accessToken: string;
    expiresAt: string;
}

function isExpired(session: LoginResponse): boolean {
    return new Date(session.expiresAt).getTime() <= Date.now();
}

export class AuthService {
    private readonly client: ApiClient;
    private session: LoginResponse | null = null;

    constructor(client: ApiClient = api) {
        this.client = client;
    }

    async login(credentials: LoginCredentials): Promise<LoginResponse> {
        const session = await this.client.post<LoginResponse>("/auth/login", credentials);

        await this.applySession(session);

        return session;
    }

    async restore(): Promise<LoginResponse | null> {
        const stored = await AsyncStorage.getItem(SESSION_STORAGE_KEY);

        if (!stored) {
            return null;
        }

        try {
            const session = JSON.parse(stored) as LoginResponse;

            if (!session.accessToken || isExpired(session)) {
                await this.logout();
                return null;
            }

            this.session = session;
            this.client.setAuthToken(session.accessToken);

            return session;
        } catch {
            await this.logout();
            return null;
        }
    }

    async logout() {
        this.session = null;
        this.client.setAuthToken(null);

        await AsyncStorage.removeItem(SESSION_STORAGE_KEY);
    }

    getAccessToken(): string | null {
        return this.session?.accessToken ?? null;
    }

    isAuthenticated(): boolean {
        return this.session !== null && !isExpired(this.session);
    }

    private async applySession(session: LoginResponse) {
        this.session = session;
        this.client.setAuthToken(session.accessToken);

        await AsyncStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
    }
}

export const authService = new AuthService();
