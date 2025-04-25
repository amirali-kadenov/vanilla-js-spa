/**
 * @param {string | undefined} input
 * @param {number} maxValue
 */
export const applyInputMask = (input, maxValue) => {
  if (!input) return ''

  // Remove any non-numeric characters
  const numericInput = input.replace(/\D/g, '')

  /** @type {number} */
  // Ensure the input is between 00 and 60
  let result = parseInt(numericInput, 10)

  if (isNaN(result)) return ''

  if (result > maxValue) return String(maxValue) // Limit to 60

  return String(result) // Return as two digits
}

/**
 * @param {number | null} hours
 * @param {number | null} minutes
 * @param {number | null} seconds
 * @returns {number}
 */
export const getTimeInMs = (hours, minutes, seconds) => {
  let totalTime = 0

  if (hours) {
    totalTime = totalTime + hours * 3600
  }
  if (minutes) {
    totalTime = totalTime + minutes * 60
  }
  if (seconds) {
    totalTime = totalTime + seconds
  }

  return totalTime
}
