'use client'

import { useSignUp } from '@clerk/nextjs'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const signUpSchema = z.object({
  email: z.string().email('Informe um e-mail válido').min(1, 'Informe um e-mail válido'),
  password: z.string().min(8, 'A senha deve ter no mínimo 8 caracteres').trim(),
  name: z.string().min(1, 'Informe o nome')
    .trim()
    .refine((name) => name.split(' ').length >= 2, { message: 'O nome deve conter pelo menos dois nomes' }),
})

type SignUpFormData = z.infer<typeof signUpSchema>

export function FormSingUp() {
  const router = useRouter()

  const { isLoaded, signUp, setActive } = useSignUp()

  const { register, handleSubmit } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  })

  const { mutateAsync } = useMutation({
    mutationFn: registerUser,
  })

  async function handleSignUp({ name, email, password }: SignUpFormData) {
    await mutateAsync({
      name,
      email,
      password,
    }, {
      onSuccess: () => router.replace('/'),
      onError: (err) => console.error(err),
    })
  }

  async function registerUser({ name, email, password }: SignUpFormData) {
    if (!isLoaded) {
      return
    }

    try {
      const [firstName, ...rest] = name.split(' ')

      const response = await signUp.create({
        firstName,
        lastName: rest.join(' '),
        emailAddress: email,
        password,
      })

      if (response.status !== 'complete') {
        return
      }

      await setActive({ session: response.createdSessionId })
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  if (!isLoaded) {
    return null
  }

  return (
    <form onSubmit={handleSubmit(handleSignUp)}>
      <input
        placeholder="name"
        {...register('name')}
      />

      <input
        type="email"
        placeholder="e-mail"
        {...register('email')}
      />

      <input
        type="password"
        placeholder="password"
        {...register('password')}

      />

      <button>Criar conta</button>
    </form>
  )
}
