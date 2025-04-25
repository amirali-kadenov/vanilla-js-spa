import { ProtectedRoute } from '@/features/auth/ui/protected-route.mjs'

const VideoPlayerPage = new ProtectedRoute({
  render: () => '<h2>Video Player</h2><p>Content for video player.</p>',
  onMount: () => {
    console.log('VideoPlayerPage MOUNTED')

    return () => {
      console.log('VideoPlayerPage UNMOUNTED')
    }
  },
})

export default VideoPlayerPage
