import { HttpStatus } from '@nestjs/common';
import {
  ApiResponse,
  PaginatedResponse,
  PaginationMeta,
} from '../types/common.types';

/**
 * Utility class for creating standardized API responses
 */
export class ResponseUtil {
  /**
   * Create a successful response
   */
  static success<T>(data: T, message?: string): ApiResponse<T> {
    return {
      success: true,
      data,
      errors: [],
      message: message || 'Operation completed successfully',
    };
  }

  /**
   * Create an error response
   */
  static error(errors: string | string[], message?: string): ApiResponse<null> {
    const errorArray = Array.isArray(errors) ? errors : [errors];
    return {
      success: false,
      data: null,
      errors: errorArray,
      message: message || 'Operation failed',
    };
  }

  /**
   * Create a paginated response
   */
  static paginated<T>(
    data: T[],
    meta: PaginationMeta,
    message?: string,
  ): PaginatedResponse<T> {
    return {
      success: true,
      data,
      errors: [],
      message: message || 'Data retrieved successfully',
      meta,
    };
  }

  /**
   * Create pagination metadata
   */
  static createPaginationMeta(
    currentPage: number,
    itemsPerPage: number,
    totalItems: number,
  ): PaginationMeta {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    return {
      currentPage,
      totalPages,
      totalItems,
      itemsPerPage,
      hasNextPage: currentPage < totalPages,
      hasPreviousPage: currentPage > 1,
    };
  }

  /**
   * Create a not found response
   */
  static notFound(resource: string = 'Resource'): ApiResponse<null> {
    return this.error(`${resource} not found`, 'Not Found');
  }

  /**
   * Create an unauthorized response
   */
  static unauthorized(
    message: string = 'Unauthorized access',
  ): ApiResponse<null> {
    return this.error(message, 'Unauthorized');
  }

  /**
   * Create a forbidden response
   */
  static forbidden(message: string = 'Access forbidden'): ApiResponse<null> {
    return this.error(message, 'Forbidden');
  }

  /**
   * Create a validation error response
   */
  static validationError(errors: string[]): ApiResponse<null> {
    return this.error(errors, 'Validation failed');
  }

  /**
   * Create a created response
   */
  static created<T>(data: T, message?: string): ApiResponse<T> {
    return {
      success: true,
      data,
      errors: [],
      message: message || 'Resource created successfully',
    };
  }

  /**
   * Create an updated response
   */
  static updated<T>(data: T, message?: string): ApiResponse<T> {
    return {
      success: true,
      data,
      errors: [],
      message: message || 'Resource updated successfully',
    };
  }

  /**
   * Create a deleted response
   */
  static deleted(message?: string): ApiResponse<null> {
    return {
      success: true,
      data: null,
      errors: [],
      message: message || 'Resource deleted successfully',
    };
  }
}
