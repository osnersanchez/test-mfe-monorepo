export interface FetchOptions extends RequestInit {
  headers?: Record<string, string>;
}

export interface ApiResponse<T> {
  data: T;
  error?: string;
}
