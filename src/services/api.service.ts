export class ApiService {
    private static async request<T>(
        endpoint: string,
        options?: RequestInit
    ): Promise<T> {
        const res = await fetch(endpoint, options);
        if (!res.ok) {
            const errorData = await res.json().catch(() => ({}));
            throw new Error(errorData.message || `API Error: ${res.statusText}`);
        }
        return res.json();
    }

    static async get<T>(endpoint: string, headers?: HeadersInit): Promise<T> {
        return this.request<T>(endpoint, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                ...headers,
            },
        });
    }

    static async post<T>(
        endpoint: string,
        body: any,
        headers?: HeadersInit
    ): Promise<T> {
        return this.request<T>(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                ...headers,
            },
            body: JSON.stringify(body),
        });
    }
}
