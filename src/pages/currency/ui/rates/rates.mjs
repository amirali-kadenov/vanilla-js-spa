import { Component } from '@/shared/model/component.mjs'
import { Typography } from '@/shared/ui/typography/typography.mjs'
import { useSessionScroll } from '../../lib/use-session-scroll.mjs'
import { RATES_CONFIG } from './config.mjs'
import { RatesColumn } from './ui/rates-column.mjs'
import { RatesCurrencyTitle } from './ui/rates-currency-title.mjs'
import './rates.scss'

/**
 * @typedef {import('../../currency.mjs').CurrencyPageState} CurrencyPageState
 */

/**
 * @typedef {import('@/shared/model/component.mjs').Component<CurrencyPageState>} CurrencyPage
 */

export class Rates extends Component {
  /**
   * @param {CurrencyPage} currencyPage
   */
  constructor(currencyPage) {
    super({
      onMount: (element) => {
        const cleanup = useSessionScroll(element, '.rates__data')

        return cleanup
      },
      render() {
        const { rates, baseRate } = currencyPage.state

        const formattedDate = new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })

        return /* html */ `
          <div class="rates">
            <div class="rates__header">
              ${Typography({
                variant: Typography.Variants.LARGE,
                children: 'Exchange rates',
                tag: 'h1',
                weight: Typography.Weights.EMPHASIZED,
              })}
              ${Typography({
                variant: Typography.Variants.LARGE,
                children: formattedDate,
                tag: 'time',
                weight: Typography.Weights.EMPHASIZED,
                className: 'rates__date',
              })}
            </div>

            <div class="rates__data">
              ${RatesColumn({
                children: RatesCurrencyTitle({
                  ratesInstance: this,
                  baseRate,
                  currencyPage,
                  rates,
                }),
                rates,
                listsSettings: RATES_CONFIG.NAME_LIST_SETTINGS,
                className: 'rates__data-list--name',
              })}
              ${RatesColumn({
                title: 'Best courses',
                rates,
                listsSettings: [
                  RATES_CONFIG.SURRENDER_LIST_SETTINGS,
                  RATES_CONFIG.BUY_LIST_SETTINGS,
                ],
                className: 'rates__data-list--best-courses',
              })}
              ${RatesColumn({
                title: 'Exchange',
                rates,
                listsSettings: [
                  RATES_CONFIG.RATE_LIST_SETTINGS,
                  RATES_CONFIG.RATE_CHANGE_LIST_SETTINGS,
                  RATES_CONFIG.RATE_CHANGE_DATE_LIST_SETTINGS,
                ],
                className: 'rates__data-list--exchange',
              })}
            </div>
          </div>
      `
      },
    })
  }
}
