const SELECTED_RATES_KEY = 'selectedRates'

export const getSessionSelectedRates = () => {
  const selectedRates = sessionStorage.getItem(SELECTED_RATES_KEY)

  if (!selectedRates) return null

  return JSON.parse(selectedRates)
}

/**
 * @param {import("./data.mjs").ExchangeRate[]} rates
 */
export const setSessionSelectedRates = (rates) => {
  sessionStorage.setItem(SELECTED_RATES_KEY, JSON.stringify(rates))
}
