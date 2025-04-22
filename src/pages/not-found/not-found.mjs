import { PATHS } from '@/shared/config/paths.mjs'
import { Component } from '@/shared/model/component.mjs'
import { ButtonLink } from '@/shared/ui/button/button.mjs'
import { Typography } from '@/shared/ui/typography/typography.mjs'
import './not-found.scss'

export const NotFoundPage = new Component({
  render: () => /* html */ `
    <div class="not-found">
      ${Typography({
        variant: Typography.Variants.TITLE_1,
        children: '404',
        weight: Typography.Weights.EMPHASIZED,
        tag: 'h1',
      })}
      ${Typography({
        variant: Typography.Variants.TITLE_2,
        children: 'Page not found',
        weight: Typography.Weights.REGULAR,
        tag: 'h2',
      })}
      ${ButtonLink({
        variant: ButtonLink.Variants.PRIMARY,
        children: 'Go home',
        href: PATHS.HOME,
      })}
    </div>
`,
})
