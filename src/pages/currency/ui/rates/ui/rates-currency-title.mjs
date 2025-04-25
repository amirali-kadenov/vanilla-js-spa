import { Component } from '@/shared/model/component.mjs'
import { Typography } from '@/shared/ui/typography/typography.mjs'
import { RatesBaseCurrencySelect } from './rates-base-currency-select.mjs'

/**
 * @typedef {import('../../../model/data.mjs').ExchangeRate} ExchangeRate
 * @typedef {import('../../../currency.mjs').CurrencyPageState} CurrencyPageState
 */

/**
 * @typedef {Object} Props
 * @property {string} baseRate
 * @property {Component<CurrencyPageState>} currencyPage
 * @property {Component} ratesInstance
 * @property {ExchangeRate[]} rates
 */

/**
 * @param {Props} props
 */
export const RatesCurrencyTitle = ({
  baseRate,
  currencyPage,
  ratesInstance,
  rates,
}) => {
  return /* html */ `
    <div class="rates__currency-title">
      <h2 class="rates__data-column-title">
        Base:
        ${Typography({
          variant: Typography.Variants.TITLE_2,
          weight: Typography.Weights.EMPHASIZED,
          children: baseRate,
          tag: 'span',
        })}
      </h2>
      ${Component.child(
        ratesInstance,
        new RatesBaseCurrencySelect({
          rates,
          currencyPage,
        })
      )}
    </div>
    `
}
