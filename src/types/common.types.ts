/**
 * Common types and interfaces used across the application
 */

/**
 * Standard API response structure
 */
export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  errors: string[];
  message?: string;
}

/**
 * Database query options
 */
export interface QueryOptions {
  page?: number;
  limit?: number;
  sort?: Record<string, 1 | -1>;
  populate?: string | string[];
}

/**
 * Pagination metadata
 */
export interface PaginationMeta {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

/**
 * Paginated response structure
 */
export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  meta: PaginationMeta;
}

/**
 * JWT payload structure
 */
export interface JwtPayload {
  username: string;
  role: string;
  id: string;
  iat?: number;
  exp?: number;
}

/**
 * Request with authenticated user
 */
export interface AuthenticatedRequest {
  user: JwtPayload;
  headers: {
    authorization?: string;
    [key: string]: any;
  };
  [key: string]: any;
}

/**
 * Hard skill structure
 */
export interface HardSkill {
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  yearsOfExperience?: number;
}

/**
 * Database entity base interface
 */
export interface BaseEntity {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Service response wrapper
 */
export interface ServiceResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  statusCode?: number;
}
