'use client'

import { useClerk } from '@clerk/nextjs'
import { useEffect } from 'react'

export default function OAuthCallback() {
  const { handleRedirectCallback } = useClerk()

  useEffect(() => {
    const completeSignIn = async () => {
      try {
        await handleRedirectCallback({})
      } catch (error) {
        console.error('Erro ao lidar com o callback:', error)
      }
    }

    completeSignIn()
  }, [handleRedirectCallback])

  return null
}
