import { Component } from '@/shared/model/component.mjs'
import { Button } from '@/shared/ui/button/button.mjs'
import { Input } from '@/shared/ui/input/input.mjs'
import { LOGIN_FORM_IDS, LOGIN_NO_ERRORS } from '../lib/constants.mjs'
import { handleLoginSubmit } from '../model/handle-submit.mjs'
import { EnvelopeIcon } from './icons/envelope.mjs'
import { PasswordInput } from './password-input.mjs'

/**
 * @typedef {() => void} OnSubmitError
 */

/**
 * @typedef {Object} LoginFormProps
 * @property {OnSubmitError} onSubmitError
 */

export class LoginForm extends Component {
  /** @param {LoginFormProps} props */
  constructor({ onSubmitError }) {
    const render = () => {
      const emailInput = new Input({
        type: 'email',
        id: LOGIN_FORM_IDS.EMAIL,
        name: LOGIN_FORM_IDS.EMAIL,
        value: this.state.email,
        error: this.state.errors.email,
        placeholder: 'Email',
        autocomplete: 'email',
        className: 'login__input',
        leftIcon: EnvelopeIcon({
          className: this.state.email ? 'login__icon--active' : 'login__icon--inactive',
        }),
        onInput: (e) => {
          this.state.email = /** @type {HTMLInputElement} */ (e.target).value
        },
      })

      const passwordInput = new PasswordInput({
        error: this.state.errors.password,
        value: this.state.password,
        id: LOGIN_FORM_IDS.PASSWORD,
        name: LOGIN_FORM_IDS.PASSWORD,
        autocomplete: 'password',
        className: 'login__input',
        onInput: (e) => {
          this.state.password = /** @type {HTMLInputElement} */ (e.target).value
        },
      })

      return /* html */ `
        <form class="login__form">
          ${Component.child(this, emailInput)}
          <!-- -->
          ${Component.child(this, passwordInput)}
          ${Button({
            children: 'Login',
            type: 'submit',
            variant: Button.Variants.PRIMARY,
            width: Button.Width.FULL,
          })}
        </form>
      `
    }

    /** @param {HTMLElement} element */
    const onMount = (element) => {
      const form = element.querySelector('form')
      if (!form) return

      /** @param {SubmitEvent} e */
      const handleSubmit = (e) => {
        e.preventDefault()
        handleLoginSubmit(this, onSubmitError)
      }

      form.addEventListener('submit', handleSubmit)

      return () => {
        form.removeEventListener('submit', handleSubmit)
      }
    }

    super({
      initialState: {
        email: '',
        password: '',
        errors: LOGIN_NO_ERRORS,
      },
      render,
      onMount,
    })
  }
}
