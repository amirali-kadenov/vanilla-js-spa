import { ProtectedRoute } from '@/features/auth/ui/protected-route.mjs'

const TimerPage = new ProtectedRoute({
  render: () => '<h2>Countdown timer</h2><p>Content for countdown timer</p>',
  onMount: () => {
    console.log('Countdown MOUNTED')

    return () => {
      console.log('Countdown UNMOUNTED')
    }
  },
})

export default TimerPage
