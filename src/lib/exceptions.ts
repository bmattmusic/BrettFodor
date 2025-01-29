export class ApiError extends Error {
    public readonly statusCode: number
    public readonly code: string
  
    constructor(statusCode: number, message: string, code: string) {
      super(message)
      this.statusCode = statusCode
      this.code = code
    }
  
    static BadRequest(message: string, code = 'BAD_REQUEST') {
      return new ApiError(400, message, code)
    }
  
    static Unauthorized(message = 'Unauthorized', code = 'UNAUTHORIZED') {
      return new ApiError(401, message, code)
    }
  
    static Forbidden(message = 'Forbidden', code = 'FORBIDDEN') {
      return new ApiError(403, message, code)
    }
  
    static NotFound(message = 'Not found', code = 'NOT_FOUND') {
      return new ApiError(404, message, code)
    }
  
    static TooManyRequests(message = 'Too many requests', code = 'RATE_LIMIT') {
      return new ApiError(429, message, code)
    }
  
    static Internal(message = 'Internal server error', code = 'INTERNAL') {
      return new ApiError(500, message, code)
    }
  }