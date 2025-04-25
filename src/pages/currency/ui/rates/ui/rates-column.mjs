import { resolveString } from '@/shared/lib/resolve-string.mjs'
import { Typography } from '@/shared/ui/typography/typography.mjs'
import { RatesColumnList } from './rates-column-list.mjs'

/**
 * @typedef {import('../../../model/data.mjs').ExchangeRate} ExchangeRate
 */

/**
 * @typedef {import('./rates-column-list.mjs').ListSettings} ListSettings
 */

/**
 * @typedef {Object} Props
 * @property {string} [title]
 * @property {string} [children]
 * @property {ExchangeRate[]} rates
 * @property {ListSettings[] | ListSettings} listsSettings
 * @property {string} [className]
 */

/** @param {Props} props */

/** @param {Props} props */
export const RatesColumn = ({
  title,
  children,
  rates,
  listsSettings,
  className,
}) => {
  const isMulti = Array.isArray(listsSettings)

  return /* html */ `
  <div
      class="${resolveString(
        'rates__data-column',
        (!title || !children) && 'rates__data-column--no-title'
      )}"
    >
      ${resolveString(
        title &&
          Typography({
            variant: Typography.Variants.TITLE_2,
            weight: Typography.Weights.REGULAR,
            children: title,
            tag: 'h2',
            className: 'rates__data-column-title',
          }),
        children
      )}

      <div
        class="${resolveString(
          'rates__data-list-container',
          isMulti && 'rates__data-list-container--multi',
          className
        )}"
      >
        ${isMulti
          ? listsSettings
              .map((settings) => RatesColumnList({ rates, settings }))
              .join('')
          : RatesColumnList({ rates, settings: listsSettings })}
      </div>
    </div>
    `
}
