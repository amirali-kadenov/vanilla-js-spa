import { Router } from '@/shared/model/router.mjs'
import { Modal } from '@/shared/ui/modal/modal.mjs'
import { Typography } from '@/shared/ui/typography/typography.mjs'
import { AuthForm } from '../../auth-form/auth-form.mjs'
import './stale-session.scss'

export const StaleSessionModal = new Modal({
  onMount: function () {
    const authForm = new AuthForm({
      onSuccess: () => {
        this.close()
        Router.renderActiveRoute()
      },
    })

    const form = document.querySelector('.stale-session-modal__form')
    if (!form) return

    form.innerHTML = authForm.toHTML()
    authForm.mount()

    return () => {
      authForm.unmount()
    }
  },
  closeOnBackdrop: false,
  withCloseButton: false,
  render: () => /* html */ `
    <div class="stale-session-modal">
      ${Typography({
        children: 'Stale Session',
        variant: Typography.Variants.TITLE_2,
        weight: Typography.Weights.SEMIBOLD,
        tag: 'h2',
      })}
      ${Typography({
        children: 'Your session has expired. Please log in again.',
        variant: Typography.Variants.BODY_2,
      })}
      <div class="stale-session-modal__form"></div>
    </div>
  `,
})
