import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const isPublicRoute = createRouteMatcher(['/', '/auth/callback', '/feed', '/api/webhooks(.*)'])

export default clerkMiddleware(async (auth, request) => {
  const { origin, pathname } = request.nextUrl

  if (pathname === '/' || pathname === '/auth/callback') {
    const { userId } = await auth()

    if (userId) {
      return NextResponse.redirect(new URL('/feed', request.url))
    }
  }

  const loginUrl = `${origin}/`

  if (!isPublicRoute(request)) {
    await auth.protect({ unauthenticatedUrl: loginUrl })
  }
})

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}
