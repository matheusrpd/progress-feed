import { WebhookEvent } from '@clerk/nextjs/server'
import { headers } from 'next/headers'
import { NextRequest } from 'next/server'
import { Webhook } from 'svix'

import { db } from '@/db/connection'
import { users } from '@/db/schema'
import { env } from '@/env'

export async function POST(request: NextRequest) {
  const WEBHOOK_SECRET = env.WEBHOOK_SECRET

  if (!WEBHOOK_SECRET) {
    throw new Error('Please add WEBHOOK_SECRET in enviroment variables')
  }

  const wh = new Webhook(WEBHOOK_SECRET)

  const headerPayload = await headers()
  const svixId = headerPayload.get('svix-id')
  const svixTimestamp = headerPayload.get('svix-timestamp')
  const svixSignature = headerPayload.get('svix-signature')

  if (!svixId || !svixTimestamp || !svixSignature) {
    return new Response('Error: Missing Svix headers', {
      status: 400,
    })
  }

  const payload = await request.json()
  const body = JSON.stringify(payload)

  let evt: WebhookEvent

  try {
    evt = wh.verify(body, {
      'svix-id': svixId,
      'svix-timestamp': svixTimestamp,
      'svix-signature': svixSignature,
    }) as WebhookEvent
  } catch (err) {
    console.error('Error: Could not verify webhook:', err)

    return new Response('Error: Verification error', {
      status: 400,
    })
  }

  if (evt.type === 'user.created') {
    try {
      const {
        id,
        email_addresses: emails,
        primary_email_address_id: primaryEmailId,
        first_name: firstName,
        last_name: lastName,
        image_url: imageUrl,
      } = evt.data

      const primaryEmail = emails.find(item => item.id === primaryEmailId)

      if (!primaryEmail) {
        return
      }

      await syncUser({
        externalId: id,
        email: primaryEmail.email_address,
        name: `${firstName}${lastName ? ` ${lastName}` : ''}`,
        profileImage: imageUrl,
      })
    } catch (error) {
      console.error('Error: could not create user', error)
    }
  }

  return new Response('Webhook received', { status: 200 })
}

type syncUserParams = {
  externalId: string
  name: string
  email: string
  profileImage: string | null
}

async function syncUser({ externalId, name, email, profileImage }: syncUserParams) {
  await db
    .insert(users)
    .values({
      name,
      email,
      clerkId: externalId,
      ...(profileImage ? { profileImage } : {}),
    })
}
