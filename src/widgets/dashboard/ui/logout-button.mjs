import { logout } from '@/features/auth/auth.mjs'
import { Component } from '@/shared/model/component.mjs'
import { Button } from '@/shared/ui/button/button.mjs'
import { ExitIcon } from './icons/exit.mjs'

/**
 * @extends {Component}
 */
export class LogoutButton extends Component {
  constructor() {
    super({
      onMount: (element) => {
        const button = element.querySelector('button')
        if (!button) return

        button.addEventListener('click', logout)
        return () => {
          button.removeEventListener('click', logout)
        }
      },
      render: () =>
        Button({
          children: `${ExitIcon()} Logout`,
          variant: Button.Variants.CLEAR,
          className: 'dashboard__link',
        }),
    })
  }
}
