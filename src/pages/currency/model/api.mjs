import { Auth } from '@/features/auth/auth.mjs'
import { Api } from '@/shared/api/api.mjs'

const PROXY_URL = import.meta.env.VITE_PROXY_URL
const EXCHANGE_RATES_API = import.meta.env.VITE_EXCHANGE_RATES_API

class ExchangeApi extends Api {
  constructor() {
    super(PROXY_URL + '/')
  }

  /**
   * @param {string} baseCurrency
   * @returns {Promise<[string | null, Error | null]>}
   */
  async getExchangeRatesInfo(baseCurrency) {
    try {
      const response = await this.get(
        `${EXCHANGE_RATES_API}?base=${baseCurrency.toLowerCase()}`
      )
      const html = await response.text()

      return [html, null]
    } catch (error) {
      console.error(error)
      return [null, /** @type {Error} */ (error)]
    }
  }
}

export const exchangeApi = new ExchangeApi()

exchangeApi.addRequestInterceptor(async (request) => {
  Auth.checkAuth()
  return request
})
