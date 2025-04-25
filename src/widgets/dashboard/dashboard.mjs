import { ProtectedRoute } from '@/features/auth/ui/protected-route.mjs'
import { PATHS } from '@/shared/config/paths.mjs'
import { Component } from '@/shared/model/component.mjs'
import { Router } from '@/shared/model/router.mjs'
import { Typography } from '@/shared/ui/typography/typography.mjs'
import { ExchangeIcon } from './ui/icons/exchange.mjs'
import { HourglassIcon } from './ui/icons/hourglass.mjs'
import { VideoIcon } from './ui/icons/video.mjs'
import { LogoutButton } from './ui/logout-button.mjs'
import { NavLink } from './ui/nav-link.mjs'
import './dashboard.scss'

const DashboardLayout = new ProtectedRoute({
  render: function () {
    return /* html */ `
    <div class="dashboard">
        <div class="dashboard__sidebar">
          <header class="dashboard__header">
            ${Typography({
              children: 'Logo',
              className: 'dashboard__logo',
              variant: Typography.Variants.TITLE_1,
              weight: Typography.Weights.EMPHASIZED,
            })}
          </header>

          <nav class="dashboard__nav">
            <ul class="dashboard__nav-items">
              <li>
                ${NavLink({
                  children: `${ExchangeIcon()} Currency Rates`,
                  href: PATHS.EXCHANGE_RATES,
                })}
              </li>
              <li>
                ${NavLink({
                  children: `${VideoIcon()} Video Player`,
                  href: PATHS.VIDEO_PLAYER,
                })}
              </li>
              <li>
                ${NavLink({
                  children: `${HourglassIcon()} Timer`,
                  href: PATHS.TIMER,
                })}
              </li>
            </ul>
          </nav>

          <footer class="dashboard__footer">
            <!-- -->
            ${Component.child(this, new LogoutButton())}
          </footer>
        </div>

        <main class="dashboard__content">
          <div class="dashboard__content-wrapper">
            <!-- -->
            ${Router.createChildPlaceholder()}
          </div>
        </main>
      </div>
  `
  },
})

export default DashboardLayout
