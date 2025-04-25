import { LoginPage } from '@/pages/login/login.mjs'
import { NotFoundPage } from '@/pages/not-found/not-found.mjs'
import { PATHS } from '@/shared/config/paths.mjs'
import { lazyLoad } from '@/shared/model/lazy-load.mjs'
import { Router } from '@/shared/model/router.mjs'
import { DashboardSkeleton } from '@/widgets/dashboard/index.mjs'
import './styles/index.scss'

const DashboardLayout = async () =>
  lazyLoad('/src/widgets/dashboard/dashboard.mjs')

const CurrencyPage = async () => lazyLoad('/src/pages/currency/currency.mjs')

const VideoPlayerPage = async () =>
  lazyLoad('/src/pages/video-player/video-player.mjs')

const TimerPage = async () => lazyLoad('/src/pages/timer/timer.mjs')

const App = () => {
  const rootElement = document.getElementById('app')

  if (!rootElement) {
    return
  }

  const routes = [
    { path: PATHS.LOGIN, component: LoginPage },
    {
      path: PATHS.HOME,
      component: DashboardLayout,
      placeholder: DashboardSkeleton,
      children: [
        {
          path: PATHS.EXCHANGE_RATES,
          component: CurrencyPage,
        },
        { path: PATHS.VIDEO_PLAYER, component: VideoPlayerPage },
        { path: PATHS.TIMER, component: TimerPage },
      ],
    },
  ]

  Router.init({
    routes,
    notFoundComponent: NotFoundPage,
    rootElement,
  })
}

App()
