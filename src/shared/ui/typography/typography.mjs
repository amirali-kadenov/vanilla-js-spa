import { resolveString } from '@/shared/lib/resolve-string.mjs'
import './typography.scss'

/**
 * @typedef {'title-1' | 'title-2' | 'title-3' | 'body-1' | 'body-2' | 'caption-1' | 'caption-2'} TypographyVariants
 */

/**
 * @typedef {'regular' | 'emphasized' | 'semibold'} TypographyWeights
 */

/**
 * @typedef {Object} TypographyProps
 * @property {TypographyVariants} variant
 * @property {string} children
 * @property {TypographyWeights} [weight='regular']
 * @property {string} [className]
 * @property {string} [tag]
 */

/**
 * @param {TypographyProps} props
 */
export const Typography = ({ variant, children, weight = 'regular', className, tag = 'p' }) => {
  return /* html */ `
    <${tag} class="${resolveString(variant, weight, className)}">
      ${children}
    </${tag}>
  `
}

Typography.Variants = Object.freeze({
  TITLE_1: 'title-1',
  TITLE_2: 'title-2',
  TITLE_3: 'title-3',
  BODY_1: 'body-1',
  BODY_2: 'body-2',
  CAPTION_1: 'caption-1',
  CAPTION_2: 'caption-2',
})

Typography.Weights = Object.freeze({
  REGULAR: 'regular',
  EMPHASIZED: 'emphasized',
  SEMIBOLD: 'semibold',
})
