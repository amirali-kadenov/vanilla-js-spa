import { Auth } from '@/features/auth/auth.mjs'
import { Component } from '@/shared/model/component.mjs'
import { exchangeApi } from './model/api.mjs'
import { prepareRates, updateSelectedRates } from './model/data.mjs'
import { parseRatesInfo } from './model/parser.mjs'
import { getSessionSelectedRates } from './model/session.mjs'
import { getBaseRateParam } from './model/url.mjs'
import { Converter } from './ui/converter/converter.mjs'
import { openErrorModal } from './ui/error-modal/error-modal.mjs'
import { NoData } from './ui/no-data/no-data.mjs'
import { Rates } from './ui/rates/rates.mjs'
import { CurrencySkeleton } from './ui/skeleton/currency-skeleton.mjs'
import './currency.scss'
/**
 * @typedef {import('./model/data.mjs').ExchangeRate} ExchangeRate
 */

/**
 * @typedef {Object} CurrencyPageState
 * @property {ExchangeRate[]} rates
 * @property {ExchangeRate[]} selectedRates
 * @property {string} baseRate
 * @property {string} converterValue
 * @property {boolean} isLoading
 * @property {boolean} isError
 * @property {number} intervalId
 */

const UPDATE_INTERVAL_TIME = 30 * 1000 // 30 seconds

const CurrencyPage = new Component({
  /** @type {CurrencyPageState} */
  initialState: {
    rates: [],
    baseRate: getBaseRateParam() ?? 'USD',
    isLoading: false,
    isError: false,
    selectedRates: getSessionSelectedRates() ?? [],
    converterValue: '1',
    intervalId: 0,
  },
  onMount: function () {
    const getData = async () => {
      const [data, error] = await exchangeApi.getExchangeRatesInfo(
        this.state.baseRate
      )

      if (error) return error

      if (!data) return new Error('Failed to get exchange rates')

      const ratesInfo = await parseRatesInfo(data)

      if (!ratesInfo) return new Error('Failed to parse exchange rates')

      const rates = prepareRates(ratesInfo)

      this.state.rates = rates

      this.state.selectedRates = updateSelectedRates(
        rates,
        this.state.selectedRates,
        this.state.baseRate
      )
    }

    const initialGetData = async () => {
      console.log('inital getData')

      this.state.isLoading = true
      this.rerender()

      const result = await getData()

      if (result instanceof Error) {
        openErrorModal(result.message)
        this.state.isError = true
      }

      this.state.isLoading = false
      this.rerender()
    }

    initialGetData()

    const unsubscribe = Auth.isAuthed.subscribe((value) => {
      clearInterval(this.state.intervalId)

      if (!value) return

      const intervalGetData = async () => {
        const result = await getData()

        if (result instanceof Error) return

        this.rerender()
      }

      this.state.intervalId = setInterval(intervalGetData, UPDATE_INTERVAL_TIME)
    })

    return () => {
      clearInterval(this.state.intervalId)
      unsubscribe()
    }
  },
  className: 'currency',
  render: function () {
    if (this.state.isLoading) {
      return Component.child(this, CurrencySkeleton)
    }

    if (this.state.isError || !this.state.rates.length) {
      return NoData()
    }

    return /* html */ `
      ${Component.child(this, new Rates(this))}
      ${Component.child(this, new Converter(this))}
    `
  },
})

export default CurrencyPage
