'use client'

import { useSignIn } from '@clerk/nextjs'

export default function Home() {
  const { isLoaded, signIn } = useSignIn()

  async function handleSingIn(platform: 'github' | 'google') {
    if (!isLoaded) {
      return
    }

    try {
      await signIn.authenticateWithRedirect({
        strategy: platform === 'github' ? 'oauth_github' : 'oauth_google',
        redirectUrl: '/auth/callback',
        redirectUrlComplete: '/feed',
      })
    } catch (error) {
      console.error(error)
    }
  }

  if (!isLoaded) {
    return null
  }

  return (
    <main className="flex h-screen w-full items-center justify-center">
      <button onClick={() => handleSingIn('github')}>Entrar com Github</button>
      <button onClick={() => handleSingIn('google')}>Entrar com Google</button>
    </main>
  )
}
