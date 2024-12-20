import { SignOutButton } from '@clerk/nextjs'
import { currentUser } from '@clerk/nextjs/server'

export default async function Feed() {
  const user = await currentUser()

  console.log(user)

  return (
    <main>
      {user?.fullName}
      <SignOutButton redirectUrl="/" />
    </main>
  )
}
