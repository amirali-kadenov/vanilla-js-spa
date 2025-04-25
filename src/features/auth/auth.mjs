import { PATHS } from '@/shared/config/paths.mjs'
import { Router } from '@/shared/model/router.mjs'
import { createSignal } from '@/shared/model/signal.mjs'
import { StaleSessionModal } from './ui/modals/stale-session/stale-session.mjs'

const AUTH_TOKEN_KEY = 'auth_token'

const TOKEN_EXPIRY = 60 * 60 * 1000 // 1 hour in milliseconds

const [isAuthed, setIsAuthed] = createSignal(false)

const handleInvalidAuth = () => {
  setIsAuthed(false)
  StaleSessionModal.open()
}

const checkAuth = () => {
  const tokenStr = localStorage.getItem(AUTH_TOKEN_KEY)

  if (!tokenStr) {
    handleInvalidAuth()
    return false
  }

  const token = JSON.parse(tokenStr)

  if (Date.now() > token.expiry) {
    localStorage.removeItem(AUTH_TOKEN_KEY)

    handleInvalidAuth()
    return false
  }

  setIsAuthed(true)

  return true
}

const login = () => {
  // Generate token
  const token = {
    value: Math.random().toString(36).substring(2),
    expiry: Date.now() + TOKEN_EXPIRY,
  }

  localStorage.setItem(AUTH_TOKEN_KEY, JSON.stringify(token))
  Router.navigate(PATHS.HOME)
}

const logout = () => {
  localStorage.removeItem(AUTH_TOKEN_KEY)
  Router.navigate(PATHS.LOGIN)
}

export const Auth = {
  isAuthed,
  login,
  logout,
  checkAuth,
}
