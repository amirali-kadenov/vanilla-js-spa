import { resolveString } from '@/shared/lib/resolve-string.mjs'
import { Typography } from '@/shared/ui/typography/typography.mjs'

/**
 * @typedef {import('../../../model/data.mjs').ExchangeRate} ExchangeRate
 */

/** @typedef {(item: ExchangeRate) => string} RenderItem */

/**
 * @typedef {Object} ListSettings
 * @property {RenderItem} renderItem
 * @property {string} [title]
 */

/**
 * @typedef {Object} Props
 * @property {ExchangeRate[]} rates
 * @property {ListSettings} settings
 */

/** @param {Props} props */
export const RatesColumnList = ({ rates, settings: { title, renderItem } }) => {
  return /* html */ `
    <div
      class="${resolveString(!title && 'rates__data-column--no-title')}"
    >
      ${resolveString(
        title &&
          Typography({
            variant: Typography.Variants.TITLE_2,
            weight: Typography.Weights.REGULAR,
            children: title,
            tag: 'h3',
            className: 'rates__data-list-title',
          })
      )}

      <div class="rates__data-list"> ${rates.map(renderItem).join('')} </div>
    </div>
  `
}
