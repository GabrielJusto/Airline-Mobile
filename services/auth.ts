import { ApiClient, api } from "@/services/api";

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface LoginResponse {
    accessToken: string;
    expiresAt: string;
}

export class AuthService {
    private readonly client: ApiClient;
    private session: LoginResponse | null = null;

    constructor(client: ApiClient = api) {
        this.client = client;
    }

    async login(credentials: LoginCredentials): Promise<LoginResponse> {
        const session = await this.client.post<LoginResponse>("/auth/login", credentials);

        this.session = session;
        this.client.setAuthToken(session.accessToken);

        return session;
    }

    logout() {
        this.session = null;
        this.client.setAuthToken(null);
    }

    getAccessToken(): string | null {
        return this.session?.accessToken ?? null;
    }

    isAuthenticated(): boolean {
        if (!this.session) {
            return false;
        }

        return new Date(this.session.expiresAt).getTime() > Date.now();
    }
}

export const authService = new AuthService();
