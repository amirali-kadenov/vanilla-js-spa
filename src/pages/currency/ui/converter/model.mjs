import { setSessionSelectedRates } from '../../model/session.mjs'

/**
 * @typedef {import('./converter.mjs').CurrencyPage} CurrencyPage
 * @typedef {import('./converter.mjs').Converter} Converter
 * @typedef {import('./converter.mjs').ExchangeRate} ExchangeRate

/**
 * @param {CurrencyPage} currencyPage
 * @param {Converter} converter
 * @param {ExchangeRate} rateToDelete
 */
export const deleteRate = (currencyPage, converter, rateToDelete) => {
  const { selectedRates, value } = converter.state

  const filteredSelectedRates = selectedRates.filter(
    (rate) => rate.to !== rateToDelete.to
  )

  currencyPage.state.converterValue = value
  currencyPage.state.selectedRates = filteredSelectedRates
  converter.setState({
    value,
    selectedRates: filteredSelectedRates,
  })
}

/**
 * @param {CurrencyPage} currencyPage
 * @param {Converter} converter
 * @param {string} newRateCode
 */
export const addRate = (currencyPage, converter, newRateCode) => {
  const { rates, selectedRates } = currencyPage.state

  const newRate = rates.find((rate) => rate.to === newRateCode)

  if (!newRate) {
    return
  }

  const updatedSelectedRates = [...selectedRates, newRate]

  setSessionSelectedRates(updatedSelectedRates)

  currencyPage.state.selectedRates = updatedSelectedRates

  converter.setState({
    value: converter.state.value,
    selectedRates: updatedSelectedRates,
  })
}
