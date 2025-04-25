import { Button } from '@/shared/ui/button/button.mjs'
import { Modal } from '@/shared/ui/modal/modal.mjs'
import { Typography } from '@/shared/ui/typography/typography.mjs'
import './invalid-credentials.scss'

export const InvalidCredentialsModal = new Modal({
  onMount: function () {
    const button = document.querySelector('.invalid-credentials button')
    if (!button) return

    const handleClose = () => this.close()

    button.addEventListener('click', handleClose)
    return () => button.removeEventListener('click', handleClose)
  },
  render: () => /* html */ `
    <div class="invalid-credentials">
      ${Typography({
        children: 'Invalid credentials',
        variant: Typography.Variants.TITLE_2,
        weight: Typography.Weights.SEMIBOLD,
        tag: 'h2',
      })}
      ${Typography({
        children: 'Please try again.',
        variant: Typography.Variants.BODY_2,
      })}
      ${Button({
        children: 'Close',
        variant: Button.Variants.RED,
      })}
    </div>
  `,
})
