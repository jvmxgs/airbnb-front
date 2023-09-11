import { useAuth } from '../contexts/authContext'
import { useRouter } from 'next/navigation'

export function requireAuthMiddleware(Component) {
  function AuthMiddleware() {
    const { isLoggedIn } = useAuth()
    const router = useRouter()

    if (!isLoggedIn) {
      router.push('/login')
      return null
    }

    return <Component />
  }

  return AuthMiddleware
}