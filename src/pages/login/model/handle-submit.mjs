import { login, isCredentialsValid } from '@/features/auth/auth.mjs'
import { LOGIN_NO_ERRORS } from '../lib/constants.mjs'
import { validateLoginForm } from './validation.mjs'

/**
 * @typedef {HTMLInputElement | null | undefined} Input
 */

/**
 * @param {import('../ui/login-form.mjs').LoginForm} loginForm
 * @param {() => void} onSubmitError
 */
export function handleLoginSubmit(loginForm, onSubmitError) {
  const email = loginForm.state.email
  const password = loginForm.state.password

  const [isValid, errors] = validateLoginForm(email, password)

  if (!isValid) {
    loginForm.setState({ email, password, errors })
    return
  }

  if (isCredentialsValid(email, password)) {
    loginForm.setState({
      email: '',
      password: '',
      errors: LOGIN_NO_ERRORS,
    })

    login()
  } else {
    loginForm.setState({
      email,
      password,
      errors: LOGIN_NO_ERRORS,
    })

    onSubmitError()
  }
}
