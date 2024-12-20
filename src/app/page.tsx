'use client'

import { useSignIn } from '@clerk/nextjs'

export default function Home() {
  const { isLoaded, signIn } = useSignIn()

  async function handleSingIn() {
    if (!isLoaded) {
      return
    }

    try {
      await signIn.authenticateWithRedirect({
        strategy: 'oauth_github',
        redirectUrlComplete: '/feed',
        redirectUrl: '/feed',
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
      <button onClick={handleSingIn}>Entrar com Github</button>
    </main>
  )
}
