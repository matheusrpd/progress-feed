import { SignOutButton } from '@clerk/nextjs'

export default async function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <h1>Progress Feed</h1>
      <SignOutButton />
    </div>
  )
}
