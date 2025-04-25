import { Auth } from '@/features/auth/auth.mjs'
import { InvalidCredentialsModal } from '../../modals/invalid-credentials/invalid-credentials.mjs'
import { LOGIN_NO_ERRORS } from '../lib/constants.mjs'
import { validateForm } from './validation.mjs'

/**
 * @typedef {HTMLInputElement | null | undefined} Input
 * @typedef {() => void} OnSuccess
 */

/**
 * @param {import('../auth-form.mjs').AuthForm} authForm
 * @param {OnSuccess} [onSuccess]
 */
export const handleAuthFormSubmit = (authForm, onSuccess) => {
  const email = authForm.state.email
  const password = authForm.state.password

  const [isFormValid, errors] = validateForm(email, password)

  if (!isFormValid) {
    authForm.setState({ email, password, errors })

    return
  }

  const isCredentialsValid =
    email === import.meta.env.VITE_LOGIN_EMAIL &&
    password === import.meta.env.VITE_LOGIN_PASSWORD

  if (isCredentialsValid) {
    authForm.setState({
      email: '',
      password: '',
      errors: LOGIN_NO_ERRORS,
    })

    Auth.login()

    if (onSuccess) onSuccess()
  } else {
    authForm.setState({
      email,
      password,
      errors: LOGIN_NO_ERRORS,
    })
    InvalidCredentialsModal.open()
  }
}
