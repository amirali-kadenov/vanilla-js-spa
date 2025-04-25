import { resolveString } from '@/shared/lib/resolve-string.mjs'
import { Typography } from '@/shared/ui/typography/typography.mjs'

/**
 * @typedef {Object} Props
 * @property {string} value
 * @property {string} [children]
 * @property {string} [className]
 */

const MAX_CHARACTERS = 7

/** @param {Props} props */
export const RatesColumnItem = ({ value, children, className }) => {
  const isTruncate = value.length > MAX_CHARACTERS
  return /* html */ `
   <div
      class="${resolveString(
        'rates__data-list-item',
        isTruncate && 'rates__data-list-item--truncate',
        className
      )}"
    >
      ${resolveString(children)}
      ${Typography({
        variant: Typography.Variants.TITLE_2,
        children: value,
        tag: 'span',
        weight: Typography.Weights.EMPHASIZED,
        title: isTruncate ? value : undefined,
      })}
    </div>
  `
}
