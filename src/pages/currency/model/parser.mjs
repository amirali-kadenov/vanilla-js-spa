import { getCurrencyName } from '../lib/utils.mjs'

/**
 * @typedef {Object} ExchangeRateInfo
 * @property {string} from
 * @property {string} [to]
 * @property {string} [rate]
 * @property {string} [rateChange]
 * @property {string} [rateChangeDate]
 * @property {boolean | null} [isChangePositive]
 * @property {string} [buyPrice]
 * @property {string} [sellPrice]
 *
 */

/**
 * @typedef {Object} ExchangeRatePrices
 * @property {string} from
 * @property {string} [to]
 * @property {string} [buyPrice]
 * @property {string} [sellPrice]
 */

/**
 * @param {string} input
 */
export const parseRatesInfo = async (input) => {
  const rowRegex = /<tr\b[^>]*\sdata-symbol="[^"]*"[^>]*>[\s\S]*?<\/tr>/gi

  const parser = new DOMParser()
  const matches = input.match(rowRegex)

  if (!matches) return

  /** @type {Map<string, ExchangeRateInfo>} */
  const parsedData = new Map()

  for (const match of matches) {
    const xmlDoc = parser.parseFromString(match, 'text/xml')
    const currencyNameRaw = xmlDoc
      .querySelector('tr')
      ?.getAttribute('data-symbol')
    const currencyName = currencyNameRaw?.split(':').at(0)
    let from = currencyName?.slice(0, 3)
    const to = currencyName?.slice(3)

    if (!from) continue

    const rate = xmlDoc.querySelector('td[id="p"]')?.textContent?.trim()
    const rateChangeNode = xmlDoc.querySelector('td[id="nch"]')
    const rateChange = rateChangeNode?.textContent?.trim()
    const isChangePositive = rateChangeNode
      ?.querySelector('span')
      ?.classList.contains('market-positive-image')

    const rateChangeDate = xmlDoc
      .querySelector('td[id="date"]')
      ?.textContent?.trim()

    const result = {
      from,
      to,
      rate,
      rateChange,
      rateChangeDate,
      isChangePositive,
    }

    parsedData.set(getCurrencyName(result), result)
  }

  return parsedData
}
