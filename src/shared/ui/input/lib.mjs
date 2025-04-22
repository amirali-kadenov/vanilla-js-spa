export const DATA_HAS_VALUE_ATTRIBUTE = 'data-has-value'

/**
 * @this {import('./input.mjs').Input<*>}
 * @param {HTMLElement} element
 */
export function onInputMount(element) {
  const input = element.querySelector('input')
  if (!input) return

  /** @param {Event} e */
  const handleInput = (e) => {
    const target = /** @type {HTMLInputElement | null} */ (e.target)

    toggleHasValue(input, target?.value)

    if (this.props.onInput) {
      this.props.onInput(e)
    }
  }

  input.addEventListener('input', handleInput)
  return () => input.removeEventListener('input', handleInput)
}

/**
 * @param {HTMLInputElement} input
 * @param {string | undefined} value
 */
const toggleHasValue = (input, value) => {
  if (value) {
    input.setAttribute(DATA_HAS_VALUE_ATTRIBUTE, 'true')
  } else {
    input.removeAttribute(DATA_HAS_VALUE_ATTRIBUTE)
  }
}
