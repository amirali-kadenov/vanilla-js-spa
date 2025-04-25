import { Component } from '@/shared/model/component.mjs'
import { Button } from '@/shared/ui/button/button.mjs'
import { Input } from '@/shared/ui/input/input.mjs'
import { LOGIN_FORM_IDS, LOGIN_NO_ERRORS } from './lib/constants.mjs'
import { handleAuthFormSubmit } from './model/handle-submit.mjs'
import { EnvelopeIcon } from './ui/icons/envelope.mjs'
import { PasswordInput } from './ui/password-input.mjs'
import './auth-form.scss'
/**
 * @typedef {Object} Props
 * @property {() => void} [onSuccess]
 */

export class AuthForm extends Component {
  /**
   * @param {Props} [props]
   */
  constructor(props) {
    const render = () => {
      const emailInput = new Input({
        type: 'email',
        id: LOGIN_FORM_IDS.EMAIL,
        name: LOGIN_FORM_IDS.EMAIL,
        value: this.state.email,
        error: this.state.errors.email,
        placeholder: 'Email',
        autocomplete: 'email',
        className: 'auth__input',
        leftIcon: EnvelopeIcon({
          className: this.state.email
            ? 'auth__icon--active'
            : 'auth__icon--inactive',
        }),
        onInput: (email) => {
          this.state.email = email
        },
      })

      const passwordInput = new PasswordInput({
        error: this.state.errors.password,
        value: this.state.password,
        id: LOGIN_FORM_IDS.PASSWORD,
        name: LOGIN_FORM_IDS.PASSWORD,
        autocomplete: 'password',
        className: 'auth__input',
        onInput: (password) => {
          this.state.password = password
        },
      })

      return /* html */ `
        <form
          class="auth__form"
          autocomplete="on"
        >
          ${Component.child(this, emailInput)}
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
        handleAuthFormSubmit(this, props?.onSuccess)
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
