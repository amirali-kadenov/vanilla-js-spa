/**
 * @typedef {Record<string, boolean|string>} Mods
 */

/**
 * @typedef {false|undefined|0|null|string} Unit
 */

/**
 * @typedef {Mods|Unit} Values
 */

/**
 * Combines units and mods into a single string
 * @param {Values[]} values - Array of values
 * @returns {string} Combined string
 */
export const resolveString = (...values) => {
  /** @type {string[]} */
  const result = []

  values.forEach((item) => {
    if (item && typeof item === 'object') {
      result.push(...parseMods(item))
      return
    }

    if (item) result.push(item)
  })

  return result.join(' ')
}

/**
 * Filters mods object to get only truthy values
 * @param {Mods} mods - Object with mods
 * @returns {string[]} Array of mod names
 */
const parseMods = (mods) => Object.keys(mods).filter((key) => mods[key])
