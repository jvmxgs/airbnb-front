import { useAuth } from '../contexts/authContext'
import { useRouter } from 'next/navigation'

export function requireGuestMiddleware(Component) {
  function GuestMiddleware() {
    const { isLoggedIn } = useAuth()
    const router = useRouter()

    if (isLoggedIn) {
      router.push('/dashboard')
      return null
    }

    return <Component />
  }

  return GuestMiddleware
}