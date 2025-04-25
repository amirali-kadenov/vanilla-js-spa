const BASE_RATE_PARAM = 'baseRate'

export const getBaseRateParam = () => {
  const url = new URL(window.location.href)
  return url.searchParams.get(BASE_RATE_PARAM)
}

/**
 * @param {string} value
 */
export const setBaseRateParam = (value) => {
  const url = new URL(window.location.href)
  url.searchParams.set(BASE_RATE_PARAM, value)
  window.history.pushState({}, '', url)
}
