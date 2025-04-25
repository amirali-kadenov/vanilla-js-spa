import { getRateSelectOption } from '@/pages/currency/lib/utils.mjs'
import { Select } from '@/shared/ui/select/select.mjs'
import { Typography } from '@/shared/ui/typography/typography.mjs'
import { PlusCircleIcon } from '../icons/plus-circle.mjs'
import { addRate } from '../model.mjs'
import './add-currency.scss'

/**
 * @typedef {import("@/shared/ui/select/select.mjs").Option} Option
 * @typedef {import("../converter.mjs").Converter} Converter
 * @typedef {import("../converter.mjs").ExchangeRate} ExchangeRate
 * @typedef {import("../converter.mjs").CurrencyPage} CurrencyPage
 */

/**
 * @typedef {Object} Props
 * @property {Converter} converter
 * @property {CurrencyPage} currencyPage
 */

export class AddCurrency extends Select {
  /**
   * @param {Props} props
   */
  constructor({ converter, currencyPage }) {
    const options = currencyPage.state.rates
      .filter(
        (item) =>
          item.to &&
          !converter.state.selectedRates.some((rate) => rate.to === item.to)
      )
      .map(getRateSelectOption)

    super({
      options,
      controlClassName: 'add-currency',
      controlText: /* html */ `
        ${PlusCircleIcon()}
        ${Typography({
          variant: 'body-1',
          children: 'Add currency',
          className: 'add-currency__text',
        })}
      `,
      onChange: (value) => addRate(currencyPage, converter, value),
    })
  }
}
