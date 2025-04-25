import { Button } from '@/shared/ui/button/button.mjs'
import { Modal } from '@/shared/ui/modal/modal.mjs'
import { Typography } from '@/shared/ui/typography/typography.mjs'
import './error-modal.scss'

/**
 * @param {string} message
 */
export const openErrorModal = (message) => {
  const errorModal = new Modal({
    onMount: function () {
      const button = document.querySelector('.error-modal button')
      if (!button) return

      const handleClose = () => this.close()

      button.addEventListener('click', handleClose)
      return () => button.removeEventListener('click', handleClose)
    },
    render: () => /* html */ `
    <div class="error-modal">
        ${Typography({
          children: 'Something went wrong',
          variant: Typography.Variants.TITLE_2,
          weight: Typography.Weights.SEMIBOLD,
          tag: 'h2',
        })}
        ${Typography({
          children: message,
          variant: Typography.Variants.BODY_2,
        })}
        ${Button({
          children: 'Close',
          variant: Button.Variants.RED,
        })}
      </div>
  `,
  })

  errorModal.open()
}
