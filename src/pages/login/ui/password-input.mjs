import { Component } from '@/shared/model/component.mjs'
import { Input } from '@/shared/ui/input/input.mjs'
import { EyeIcon } from './icons/eye.mjs'
import { LockIcon } from './icons/lock.mjs'

/**
 * @typedef {Object} State
 * @property {boolean} showPassword
 */

/**
 * @typedef {import('@/shared/ui/input/input.mjs').InputProps} InputProps
 */

/**
 * @typedef {Omit<InputProps, 'placeholder'>} PasswordInputProps
 */

/**
 * @extends {Component<State, PasswordInputProps>}
 */
export class PasswordInput extends Component {
  /** @param {PasswordInputProps} props */
  constructor(props) {
    super({
      props,
      render,
      onMount,
    })
  }
}

const PASSWORD_ICON_ID = 'passwordIcon'

/**
 * @this PasswordInput
 * @param {PasswordInputProps} props
 */
function render(props) {
  return Component.child(
    this,
    new Input({
      ...props,
      placeholder: 'Password',
      type: this.state.showPassword ? 'text' : 'password',
      leftIcon: LockIcon(),
      rightIcon: EyeIcon({
        id: PASSWORD_ICON_ID,
        className: 'login__eye-icon',
      }),
    })
  )
}

/**
 * @this PasswordInput
 * @param {HTMLElement} element
 */
function onMount(element) {
  const input = element.querySelector('input')
  const passwordIcon = element.querySelector(`#${PASSWORD_ICON_ID}`)

  if (!input || !passwordIcon) return

  const handleClick = () => {
    this.props.value = input.value
    this.setState({
      showPassword: !this.state.showPassword,
    })
  }

  passwordIcon.addEventListener('click', handleClick)
  return () => passwordIcon.removeEventListener('click', handleClick)
}
