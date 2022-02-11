class AppError extends Error {
  constructor(statusCode, message, isOpertaional) {
    super(message);
    this.statusCode = statusCode;
    this.isOpertaional = isOpertaional;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
