/**
 * @typedef {Object} Errors
 * @property {string | null} email
 * @property {string | null} password
 */

/**
 * @typedef {[boolean, Errors]} ValidationResult
 */

/**
 * Validates email and password against empty values and expected credentials.
 *
 * @param {string=} email
 * @param {string=} password
 * @returns {ValidationResult}
 */
export const validateLoginForm = (email, password) => {
  /** @type {Errors} */
  const errors = {
    email: null,
    password: null,
  }

  // Validate email format and presence
  if (!email) {
    errors.email = 'Email is required'
  } else {
    errors.email = validateEmailFormat(email)
  }

  // Validate password presence
  if (!password) {
    errors.password = 'Password is required'
  }

  const isValid = errors.email === null && errors.password === null

  return [isValid, errors]
}

/**
 * @param {string} email
 */
const validateEmailFormat = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!emailRegex.test(email)) {
    return 'Invalid email format'
  }

  return null
}
