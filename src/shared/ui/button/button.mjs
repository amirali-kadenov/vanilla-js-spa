import { resolveString } from '@/shared/lib/resolve-string.mjs'
import { getButtonClassName } from './lib.mjs'
import './button.scss'

/**
 * @typedef {'primary' | 'red' | 'disabled' | 'clear'} ButtonVariants
 */

/**
 * @typedef {'default' | 'full' | 'content'} ButtonWidths
 */

/**
 * @typedef {Object} ButtonProps
 * @property {ButtonVariants} [variant="primary"]
 * @property {ButtonWidths} [width="default"]
 * @property {string} children
 * @property {string} [className]
 * @property {boolean} [disabled=false]
 * @property {string} [type="primary"]
 * @property {string} [dataAttributes]
 * @property {string} [id]
 */

/**
 * @typedef {Omit<ButtonProps, 'type'> & { href: string }} ButtonLinkProps
 */

/**
 * @param {ButtonProps} props
 */
export const Button = (props) => {
  const resolvedClassName = getButtonClassName(props)

  return /* html */ `
    <button
      class="${resolvedClassName}"
      type="${props.type ?? 'button'}"
      ${props.disabled ? 'disabled' : ''}
      ${resolveString(props.dataAttributes)}
      ${resolveString(props.id && `id="${props.id}"`)}
    >
      ${props.children}
    </button>
  `
}

/**
 * @param {ButtonLinkProps} props
 */
export const ButtonLink = (props) => {
  const buttonClassName = getButtonClassName(props)
  const resolvedClassName = resolveString(buttonClassName, 'button--link')

  return /* html */ `
    <a
      href="${props.href}"
      class="${resolvedClassName}"
    >
      ${props.children}
    </a>
  `
}

const VARIANTS = Object.freeze({
  PRIMARY: 'primary',
  RED: 'red',
  DISABLED: 'disabled',
  CLEAR: 'clear',
})

const WIDTHS = Object.freeze({
  DEFAULT: 'default',
  FULL: 'full',
})

Button.Variants = ButtonLink.Variants = VARIANTS
Button.Width = ButtonLink.Sizes = WIDTHS
