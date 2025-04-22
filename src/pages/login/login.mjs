import { Component } from '@/shared/model/component.mjs'
import { Button } from '@/shared/ui/button/button.mjs'
import { Modal, MODAL_CLOSE_ATTRIBUTE } from '@/shared/ui/modal/modal.mjs'
import { Typography } from '@/shared/ui/typography/typography.mjs'
import { LoginForm } from './ui/login-form.mjs'
import './login.scss'

export const LoginPage = new Component({
  render: function () {
    const errorModal = new Modal({
      content: /* html */ `
        ${Typography({
          variant: Typography.Variants.BODY_1,
          weight: Typography.Weights.REGULAR,
          children: 'Invalid email or password',
          className: 'login__error-message',
        })}
        ${Button({
          children: 'Ok',
          variant: Button.Variants.RED,
          width: Button.Width.DEFAULT,
          dataAttributes: MODAL_CLOSE_ATTRIBUTE,
        })}
      `,
    })

    const openErrorModal = () => {
      errorModal.open()
    }

    return /* html */ `
      ${Component.child(this, errorModal)}

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
          ${Component.child(
            this,
            new LoginForm({
              onSubmitError: openErrorModal,
            })
          )}
        </div>
      </div>
    `
  },
})
