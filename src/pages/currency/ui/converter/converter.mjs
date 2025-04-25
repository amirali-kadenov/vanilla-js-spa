import { Component } from '@/shared/model/component.mjs'
import { Typography } from '@/shared/ui/typography/typography.mjs'
import { useSessionScroll } from '../../lib/use-session-scroll.mjs'
import { AddCurrency } from './add-currency/add-currency.mjs'
import { ConverterInput } from './converter-input.mjs'
import './converter.scss'

/**
 * @typedef {import('../../model/data.mjs').ExchangeRate} ExchangeRate
 */

/**
 * @typedef {import('../../currency.mjs').CurrencyPageState} CurrencyPageState
 */

/**
 * @typedef {import('@/shared/model/component.mjs').Component<CurrencyPageState>} CurrencyPage
 */

/**
 * @typedef {Object} ConverterState
 * @property {string} value
 * @property {ExchangeRate[]} selectedRates
 */

/**
 * @typedef {Object} ConverterProps
 * @property {CurrencyPageState} currencyPage
 */

/**
 * @extends {Component<ConverterState, ConverterProps>}
 */
export class Converter extends Component {
  /**
   * @param {CurrencyPage} currencyPage
   */
  constructor(currencyPage) {
    const baseRate = currencyPage.state.baseRate

    const baseRateInfo = {
      from: baseRate,
      to: baseRate,
      rate: '1',
      rateChange: '0',
      rateChangeDate: '',
      isChangePositive: null,
      buyPrice: '1',
      sellPrice: '1',
    }

    super({
      initialState: {
        value: currencyPage.state.converterValue,
        selectedRates: currencyPage.state.selectedRates,
      },
      onMount: function (element) {
        const cleanup = useSessionScroll(element, '.converter__inputs')

        return cleanup
      },
      className: 'converter',
      render: function () {
        return /* html */ `
          ${Typography({
            variant: Typography.Variants.LARGE,
            children: 'Currency Converter',
            tag: 'h2',
            weight: Typography.Weights.EMPHASIZED,
          })}

          <div class="converter__inputs">
            ${Component.child(
              this,
              new ConverterInput({
                converter: this,
                currencyPage,
                rate: baseRateInfo,
              })
            )}
            ${this.state.selectedRates
              .map((rate) =>
                Component.child(
                  this,
                  new ConverterInput({
                    converter: this,
                    currencyPage,
                    rate,
                    isDeletable: true,
                  })
                )
              )
              .join('')}
          </div>

          ${Component.child(
            this,
            new AddCurrency({
              converter: this,
              currencyPage,
            })
          )}
        `
      },
    })
  }
}
