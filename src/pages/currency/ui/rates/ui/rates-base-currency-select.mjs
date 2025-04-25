import { getRateSelectOption } from '@/pages/currency/lib/utils.mjs'
import { setBaseRateParam } from '@/pages/currency/model/url.mjs'
import { Select } from '@/shared/ui/select/select.mjs'
import { Typography } from '@/shared/ui/typography/typography.mjs'

/**
 * @typedef {import("@/shared/ui/select/select.mjs").Option} Option
 * @typedef {import("../../../currency.mjs").ExchangeRate} ExchangeRate
 * @typedef {import('../../../currency.mjs').CurrencyPageState} CurrencyPageState
 */

/**
 * @typedef {import('@/shared/model/component.mjs').Component<CurrencyPageState>} CurrencyPage
 */

/**
 * @typedef {Object} Props
 * @property {CurrencyPage} currencyPage
 * @property {ExchangeRate[]} rates
 */

export class RatesBaseCurrencySelect extends Select {
  /**
   * @param {Props} props
   */
  constructor({ rates, currencyPage }) {
    const options = rates
      .filter((rate) => rate.to !== currencyPage.state.baseRate)
      .map(getRateSelectOption)

    super({
      options,
      controlClassName: 'rates__currency-select',
      controlText: /* html */ `
        ${Typography({
          variant: Typography.Variants.BODY_1,
          children: 'change',
          className: 'rates__currency-select-text',
        })}
      `,
      onChange: (value) => {
        setBaseRateParam(value)

        currencyPage.setState({
          ...currencyPage.state,
          baseRate: value,
        })
      },
    })
  }
}
