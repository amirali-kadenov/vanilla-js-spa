import { resolveString } from '@/shared/lib/resolve-string.mjs'
import { DATA_HAS_VALUE_ATTRIBUTE } from './lib.mjs'

/**
 * @param {import('./input.mjs').InputProps} props
 */
export const renderInput = ({
  type = 'text',
  placeholder,
  name,
  id,
  error,
  leftIcon,
  rightIcon,
  value,
  className,
  maxLength,
  autocomplete = 'off',
  disabled,
}) => {
  const errorId = `${id}-error`

  const optionalAttributes = resolveString(
    value && `value="${value}"`,
    value && `${DATA_HAS_VALUE_ATTRIBUTE}="true"`,
    error && `aria-describedby="${errorId}"`,
    autocomplete && `autocomplete="${autocomplete}"`,
    placeholder && `placeholder="${placeholder}"`,
    maxLength && `maxlength="${maxLength}"`,
    disabled && 'disabled'
  )

  const resolvedClassName = resolveString(
    'input',
    error && 'input--error',
    disabled && 'input--disabled',
    leftIcon && 'input--with-left-icon',
    rightIcon && 'input--with-right-icon',
    className
  )

  return /* html */ `
    <div class="input__wrapper">
      <input
        type="${type}"
        name="${name}"
        id="${id}"
        class="${resolvedClassName}"
        ${optionalAttributes}
      />

      ${leftIcon ? InputIcon(leftIcon, 'input__icon--left') : ''}
      ${rightIcon ? InputIcon(rightIcon, 'input__icon--right') : ''}
    </div>

    ${error ? InputError(error, errorId) : ''}
  `
}

/**
 * @param {string} error
 * @param {string} id
 */
const InputError = (error, id) => {
  return /* html */ `
    <div
      class="input__error"
      id="${id}"
    >
      ${error}
    </div>
  `
}

/**
 * @param {string} icon
 * @param {string} className
 */
export const InputIcon = (icon, className) => {
  return /* html */ `
    <div
      class="${resolveString('input__icon', className)}"
    >
      ${icon}
    </div>
  `
}
