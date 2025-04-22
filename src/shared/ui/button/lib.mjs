import { resolveString } from '@/shared/lib/resolve-string.mjs'

/**
 * @param {import('./button.mjs').ButtonProps} props
 */
export const getButtonClassName = ({
  variant = 'primary',
  width = 'default',
  disabled = false,
  className,
}) => {
  return resolveString(
    'button',
    `button--${width}`,
    `button--${variant}`,
    disabled && 'button--disabled',
    className
  )
}
