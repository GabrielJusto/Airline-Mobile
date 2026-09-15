export type QueryParams = Record<string, string | number | boolean | undefined | null>;

export interface RequestOptions {
    params?: QueryParams;
    headers?: Record<string, string>;
    signal?: AbortSignal;
}

export class ApiError extends Error {
    readonly status: number;
    readonly url: string;
    readonly body: string;

    constructor(status: number, url: string, body: string) {
        super(`Request to ${url} failed with status ${status}.`);
        this.name = "ApiError";
        this.status = status;
        this.url = url;
        this.body = body;
    }
}

export class ApiClient {
    private readonly baseUrl: string;
    private readonly defaultHeaders: Record<string, string>;
    private authToken: string | null = null;
    private onUnauthorized: (() => void) | null = null;

    constructor(baseUrl: string, defaultHeaders: Record<string, string> = {}) {
        if (!baseUrl) {
            throw new Error(
                "ApiClient requires a base URL. Set EXPO_PUBLIC_API_URL in your .env and restart the Expo server."
            );
        }

        this.baseUrl = baseUrl.replace(/\/+$/, "");
        this.defaultHeaders = { Accept: "application/json", ...defaultHeaders };
    }

    setAuthToken(token: string | null) {
        this.authToken = token;
    }

    /**
     * Called when the server rejects a request that carried a token, meaning the
     * session is no longer valid. Requests sent without a token, such as the login
     * itself, never trigger it.
     */
    setUnauthorizedHandler(handler: (() => void) | null) {
        this.onUnauthorized = handler;
    }

    buildUrl(path: string, params?: QueryParams): string {
        const normalizedPath = path.startsWith("/") ? path : `/${path}`;
        const query = new URLSearchParams();

        if (params) {
            Object.entries(params).forEach(function ([key, value]) {
                if (value !== undefined && value !== null) {
                    query.append(key, String(value));
                }
            });
        }

        const qs = query.toString();

        return `${this.baseUrl}${normalizedPath}${qs ? `?${qs}` : ""}`;
    }

    get<T>(path: string, options?: RequestOptions): Promise<T> {
        return this.request<T>("GET", path, undefined, options);
    }

    post<T>(path: string, body?: unknown, options?: RequestOptions): Promise<T> {
        return this.request<T>("POST", path, body, options);
    }

    put<T>(path: string, body?: unknown, options?: RequestOptions): Promise<T> {
        return this.request<T>("PUT", path, body, options);
    }

    patch<T>(path: string, body?: unknown, options?: RequestOptions): Promise<T> {
        return this.request<T>("PATCH", path, body, options);
    }

    delete<T>(path: string, options?: RequestOptions): Promise<T> {
        return this.request<T>("DELETE", path, undefined, options);
    }

    private async request<T>(
        method: string,
        path: string,
        body?: unknown,
        options: RequestOptions = {}
    ): Promise<T> {
        const url = this.buildUrl(path, options.params);
        const headers: Record<string, string> = { ...this.defaultHeaders, ...options.headers };

        if (this.authToken) {
            headers.Authorization = `Bearer ${this.authToken}`;
        }

        if (body !== undefined) {
            headers["Content-Type"] = "application/json";
        }

        const response = await fetch(url, {
            method,
            headers,
            signal: options.signal,
            body: body === undefined ? undefined : JSON.stringify(body)
        });

        if (!response.ok) {
            if (response.status === 401 && this.authToken) {
                this.authToken = null;
                this.onUnauthorized?.();
            }

            throw new ApiError(response.status, url, await response.text().catch(() => ""));
        }

        if (response.status === 204) {
            return undefined as T;
        }

        const text = await response.text();

        return (text ? JSON.parse(text) : undefined) as T;
    }
}

export function getApiErrorMessage(error: unknown): string {
    if (error instanceof ApiError) {
        try {
            const problem = JSON.parse(error.body);

            if (problem && typeof problem.detail === "string" && problem.detail) {
                return problem.detail;
            }
        } catch {
            // The body was not a ProblemDetails payload, fall back to the generic messages below.
        }

        if (error.status === 401) {
            return "Invalid email or password.";
        }

        return `Request failed with status ${error.status}.`;
    }

    return "Could not reach the server. Check your connection and try again.";
}

export const api = new ApiClient(process.env.EXPO_PUBLIC_API_URL ?? "");
