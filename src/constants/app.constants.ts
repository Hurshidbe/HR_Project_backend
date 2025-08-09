/**
 * Application-wide constants
 */

/**
 * HTTP status codes
 */
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const;

/**
 * API response messages
 */
export const MESSAGES = {
  SUCCESS: 'Operation completed successfully',
  CREATED: 'Resource created successfully',
  UPDATED: 'Resource updated successfully',
  DELETED: 'Resource deleted successfully',
  NOT_FOUND: 'Resource not found',
  UNAUTHORIZED: 'Unauthorized access',
  FORBIDDEN: 'Access forbidden',
  INVALID_CREDENTIALS: 'Invalid username or password',
  TOKEN_EXPIRED: 'Token expired or invalid',
  VALIDATION_ERROR: 'Validation failed',
  INTERNAL_ERROR: 'Internal server error',
} as const;

/**
 * Authentication constants
 */
export const AUTH = {
  BEARER_PREFIX: 'Bearer ',
  TOKEN_EXPIRY: '1h',
  HEADER_NAME: 'Authorization',
  COOKIE_NAME: 'access_token',
} as const;

/**
 * Database constants
 */
export const DB = {
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100,
  DEFAULT_SORT: { createdAt: -1 },
} as const;

/**
 * Validation constants
 */
export const VALIDATION = {
  MIN_PASSWORD_LENGTH: 6,
  MAX_PASSWORD_LENGTH: 128,
  MIN_USERNAME_LENGTH: 3,
  MAX_USERNAME_LENGTH: 50,
  PHONE_REGEX: /^\+?[1-9]\d{1,14}$/,
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
} as const;

/**
 * File upload constants
 */
export const UPLOAD = {
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/gif'],
  ALLOWED_DOCUMENT_TYPES: ['application/pdf', 'application/msword'],
} as const;

/**
 * Rate limiting constants
 */
export const RATE_LIMIT = {
  TTL: 20000, // 20 seconds
  LIMIT: 5, // 5 requests per TTL
} as const;

/**
 * Swagger configuration
 */
export const SWAGGER = {
  TITLE: 'HR Management System API',
  DESCRIPTION: 'HR project all endpoints',
  VERSION: '1.0',
  PATH: 'api/docs',
} as const;

/**
 * Environment variables keys
 */
export const ENV_KEYS = {
  PORT: 'PORT',
  DB_URL: 'DB_URL',
  JWT_SECRET: 'JWT',
  SUPERADMIN_USERNAME: 'SUPERADMIN',
  NODE_ENV: 'NODE_ENV',
} as const;

/**
 * Default values
 */
export const DEFAULTS = {
  PORT: 3000,
  CANDIDATE_STATUS: 'pending',
  EMPLOYEE_STATUS: 'probation',
} as const;
