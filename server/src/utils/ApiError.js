class ApiError extends Error {
  constructor(
    statusCode = 500,
    message = "Something went wrong",
    isOperational = true,
    errors = null,
    stack = ""
  ) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.errors = errors;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default ApiError;
