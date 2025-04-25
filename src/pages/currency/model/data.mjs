import { CURRENCY_ORDER_MAP } from '../lib/constants.mjs'
import { simplifyFraction } from '../lib/utils.mjs'

/**
 * @typedef {import('./parser.mjs').ExchangeRateInfo} ExchangeRateInfo
 */

/**
 * @typedef {import('./parser.mjs').ExchangeRatePrices} ExchangeRatePrices
 */

/**
 * @typedef {Required<ExchangeRateInfo & ExchangeRatePrices>} ExchangeRate
 */

/**
 * @param {Map<string, ExchangeRateInfo>} exchangeRateInfo
 * @returns {ExchangeRate[]}
 */
export const prepareRates = (exchangeRateInfo) => {
  return Array.from(exchangeRateInfo.values())
    .sort((a, b) => {
      const orderA = CURRENCY_ORDER_MAP[a.to || a.from] ?? 0
      const orderB = CURRENCY_ORDER_MAP[b.to || b.from] ?? 0

      return orderB - orderA
    })
    .map((item) => {
      const price = item.rate ? simplifyFraction(item.rate) : '-'

      return {
        from: item.from,
        to: item.to ?? '',
        rate: item.rate ?? '-',
        rateChange: item.rateChange ?? '-',
        rateChangeDate: item.rateChangeDate ?? '-',
        isChangePositive: item.isChangePositive ?? null,
        buyPrice: price,
        sellPrice: price,
      }
    })
}

/**
 * @param {ExchangeRate[]} newRates
 * @param {ExchangeRate[]} selectedRates
 * @param {string} baseRate
 * @returns {ExchangeRate[]}
 */
export const updateSelectedRates = (newRates, selectedRates, baseRate) => {
  return selectedRates
    .map((item) => {
      if (item.to === baseRate) {
        return newRates.find(
          (rate) => rate.from === baseRate && rate.to === item.from
        )
      }

      return newRates.find(
        (rate) => rate.from === baseRate && rate.to === item.to
      )
    })
    .filter((item) => item != null)
}
