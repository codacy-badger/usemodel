import { sprintf } from 'sprintf-js'
import ValidationError from './validationError'

/* Model's field's validation utilities */
function createValidator({ test, errorMessage }) {
  return value => {
    if (!test(value, this._model))
      throw new ValidationError(sprintf(errorMessage, { ...this }), this, test)
    return true
  }
}

export function combineValidators(validators, value) {
  const mappedValidators = validators.map(validator =>
    createValidator.call(this, validator)
  )
  try {
    mappedValidators.forEach(v => v.call(this, value))
    return true
  } catch (e) {
    return e
  }
}
