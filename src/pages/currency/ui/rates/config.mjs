import { resolveString } from '@/shared/lib/resolve-string.mjs'
import { Typography } from '@/shared/ui/typography/typography.mjs'
import { CurrencyIcon } from '../currency-icon/currency-icon.mjs'
import { RatesColumnItem } from './ui/rates-column-item.mjs'

/**
 * @typedef {import('./ui/rates-column-list.mjs').ListSettings} ListSettings
 */

/** @type {ListSettings} */
export const NAME_LIST_SETTINGS = {
  title: 'Currency',
  renderItem: (item) => {
    return RatesColumnItem({
      value: item.to,
      children: CurrencyIcon({ leftIconCode: item.to }),
      className: 'rates__data-list-item--name',
    })
  },
}

/** @type {ListSettings} */
export const SURRENDER_LIST_SETTINGS = {
  title: 'Surrender',
  renderItem: (item) => {
    return RatesColumnItem({ value: item.sellPrice ?? '-' })
  },
}

/** @type {ListSettings} */
export const BUY_LIST_SETTINGS = {
  title: 'Buy',
  renderItem: (item) => {
    return RatesColumnItem({ value: item.buyPrice ?? '-' })
  },
}

/** @type {ListSettings} */
export const RATE_LIST_SETTINGS = {
  title: 'Course',
  renderItem: (item) => {
    return RatesColumnItem({ value: item.rate ?? '-' })
  },
}

/** @type {ListSettings} */
export const RATE_CHANGE_LIST_SETTINGS = {
  renderItem: (item) => {
    const rateChangeSettings =
      item.isChangePositive == null
        ? null
        : item.isChangePositive
          ? {
              sign: '+',
              className: 'rates__rate-change--positive',
            }
          : {
              sign: '-',
              className: 'rates__rate-change--negative',
            }

    return Typography({
      variant: Typography.Variants.BODY_1,
      children: `${rateChangeSettings?.sign ?? ''}${item.rateChange}`,
      tag: 'span',
      weight: Typography.Weights.REGULAR,
      className: resolveString(
        'rates__data-list-item rates__rate-change',
        rateChangeSettings?.className
      ),
    })
  },
}

/** @type {ListSettings} */
export const RATE_CHANGE_DATE_LIST_SETTINGS = {
  renderItem: (item) =>
    Typography({
      variant: Typography.Variants.BODY_1,
      children: item.rateChangeDate,
      tag: 'span',
      weight: Typography.Weights.REGULAR,
      className: 'rates__data-list-item rates__rate-change--date',
    }),
}

export const RATES_CONFIG = {
  NAME_LIST_SETTINGS,
  SURRENDER_LIST_SETTINGS,
  BUY_LIST_SETTINGS,
  RATE_LIST_SETTINGS,
  RATE_CHANGE_LIST_SETTINGS,
  RATE_CHANGE_DATE_LIST_SETTINGS,
}
