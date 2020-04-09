class ValidationError extends Error {
  constructor(message, field, validator) {
    super(message)
    this.name = 'ValidationError'
    this.field = field
    this.validator = validator
  }
}
export default ValidationError