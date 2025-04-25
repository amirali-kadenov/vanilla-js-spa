import { resolveString } from '@/shared/lib/resolve-string.mjs'
import { CURRENCY_CODE_TO_NAME_MAP } from './constants.mjs'

/**
 * @param {string} name
 */
export const getIconUrl = (name) => {
  return new URL(`../assets/icons/${name}.svg`, import.meta.url).href
}

/**
 * @param {Object} currency
 * @param {string} currency.from
 * @param {string} [currency.to]
 */
export const getCurrencyName = (currency) => {
  let result = currency.from

  if (currency.to) {
    result += `/${currency.to}`
  }

  return result
}

/**
 * @param {import("../currency.mjs").ExchangeRate} rate
 */
export const getRateSelectOption = (rate) => {
  const name = rate.to
  const currencyName = CURRENCY_CODE_TO_NAME_MAP[name]
  return {
    value: name,
    label: resolveString(name, currencyName && '–', currencyName),
  }
}
/**
 * Rounds a number to keep only the first two significant digits in its fractional part.
 * @param {string|number} num - The number to process.
 * @returns {string} - The number with only the first two significant fractional digits.
 */
export const simplifyFraction = (num) => {
  // Convert input to string if it's not already
  const numStr = String(num)

  // Split into integer and fractional parts
  const [intPart, fracPart = ''] = numStr.split('.')

  // If there's no fractional part, return the original
  if (!fracPart) return numStr

  // Find the position of the first non-zero digit
  const firstNonZeroPos = fracPart.search(/[1-9]/)

  // If no non-zero digits found, return the integer part
  if (firstNonZeroPos === -1) return intPart

  // Calculate how many digits to keep (first non-zero digit + 1 more digit)
  const keepLength = firstNonZeroPos + 2

  // Ensure we don't exceed the length of the fractional part
  const actualKeepLength = Math.min(keepLength, fracPart.length)

  // Form the result by combining the integer part with the significant digits
  return `${intPart}.${fracPart.substring(0, actualKeepLength)}`
}
