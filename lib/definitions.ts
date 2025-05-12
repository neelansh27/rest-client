export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

export interface Pair {
    key: string;
    value: string;
}

export interface HistoryItem {
    id?: string;
    url: string;
    method: HttpMethod;
    headers: Pair[];
    params: Pair[];
    body: Object | null;
    createdAt?: Date;
}

