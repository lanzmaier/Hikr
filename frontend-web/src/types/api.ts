/**
 * API Response Types
 *
 * Defines standardized API response structures and error handling types.
 *
 * @author Team
 * @version 1.0
 */

/**
 * Standardized API error response
 */
export interface ApiErrorResponse {
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  details?: Record<string, unknown>;
}

/**
 * Generic API error
 */
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

/**
 * Validation error details
 */
export interface ValidationError {
  field: string;
  message: string;
}

/**
 * HTTP interceptor request config
 */
export interface RequestConfig {
  headers?: Record<string, string>;
  params?: Record<string, unknown>;
}
