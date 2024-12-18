import { SignOutButton } from '@clerk/nextjs'
import { currentUser } from '@clerk/nextjs/server'

export default async function Home() {
  const user = await currentUser()

  console.log(user)

  return (
    <div className="flex min-h-screen items-center justify-center">
      <h1>Progress Feed</h1>
      <SignOutButton />
    </div>
  )
}
