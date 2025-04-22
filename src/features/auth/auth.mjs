import { PATHS } from '@/shared/config/paths.mjs'
import { Router } from '@/shared/model/router.mjs'

const AUTH_TOKEN_KEY = 'auth_token'

const TOKEN_EXPIRY = 60 * 60 * 1000 // 1 hour in milliseconds

/**
 * @param {string} email
 * @param {string} password
 * @returns {boolean}
 */
export const isCredentialsValid = (email, password) => {
  return (
    email === import.meta.env.VITE_LOGIN_EMAIL && password === import.meta.env.VITE_LOGIN_PASSWORD
  )
}

export const login = () => {
  // Generate token
  const token = {
    value: Math.random().toString(36).substring(2),
    expiry: Date.now() + TOKEN_EXPIRY,
  }

  // Store token
  localStorage.setItem(AUTH_TOKEN_KEY, JSON.stringify(token))

  // Redirect to dashboard
  Router.navigate(PATHS.HOME)
}

export const logout = () => {
  localStorage.removeItem(AUTH_TOKEN_KEY)
  Router.navigate(PATHS.LOGIN)
}

export const checkAuth = () => {
  const tokenStr = localStorage.getItem(AUTH_TOKEN_KEY)
  if (!tokenStr) return false

  const token = JSON.parse(tokenStr)
  if (Date.now() > token.expiry) {
    localStorage.removeItem(AUTH_TOKEN_KEY)
    return false
  }

  return true
}
