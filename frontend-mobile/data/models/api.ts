export interface ApiErrorResponse {
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  details?: Record<string, unknown>;
}

export class ApiError extends Error {
  constructor(
    public code: string,
    public statusCode: number,
    message: string,
    public details?: Record<string, unknown>
  ) {
    super(message);
    this.name = 'ApiError';
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}
