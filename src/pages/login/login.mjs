import { AuthForm } from '@/features/auth/ui/auth-form/auth-form.mjs'
import { Component } from '@/shared/model/component.mjs'
import { Typography } from '@/shared/ui/typography/typography.mjs'
import './login.scss'

export const LoginPage = new Component({
  render: function () {
    return /* html */ `
      <div class="login">
        <div class="login__container">
          ${Typography({
            variant: Typography.Variants.TITLE_1,
            weight: Typography.Weights.EMPHASIZED,
            children: 'Log in',
            className: 'login__title',
          })}
          ${Typography({
            variant: Typography.Variants.BODY_1,
            weight: Typography.Weights.REGULAR,
            children: 'Welcome Back',
          })}
          ${Component.child(this, new AuthForm())}
        </div>
      </div>
    `
  },
})
