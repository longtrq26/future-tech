'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { registerFormSchema, RegisterFormValues } from '@/validations/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import { useAuth } from '@/hooks/use-auth'
import ICClose from '@/components/icons/ic-close'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const RegisterForm = () => {
  const router = useRouter()
  const { register: registerAuth } = useAuth()
  const [serverError, setServerError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      setServerError(null)
      await registerAuth({
        email: data.email,
        password: data.password,
        name: data.name,
      })
      toast.success('Account created successfully')
      router.push('/login')
    } catch (err: any) {
      setServerError(err.message || 'Registration failed')
    }
  }

  return (
    <form
      className='mx-auto w-full max-w-[19.875rem] space-y-[1.25rem] lg:max-w-[21.8125rem] lg:space-y-[1.875rem]'
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* Server Error Alert */}
      {serverError && (
        <div className='rounded-[0.375rem] border border-red-500 bg-red-500/10 p-[1rem]'>
          <div className='flex'>
            <div className='flex size-[1.25rem] flex-shrink-0 items-center justify-center rounded-full bg-red-500'>
              <ICClose className='size-[0.625rem] text-white' />
            </div>
            <div className='ml-[0.375rem]'>
              <h3 className='text-[0.875rem] leading-[1.5] tracking-[-0.03em] text-red-500'>
                Registration Error
              </h3>
              <div className='mt-[0.25rem] text-[0.875rem] leading-[1.5] tracking-[-0.03em] text-red-500'>
                {serverError}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className='space-y-[1rem]'>
        {/* Full Name Input */}
        <div className='flex flex-col gap-[0.75rem]'>
          <Label htmlFor='name' className='text-[1rem] font-medium leading-[1.5]'>
            Full Name
          </Label>
          <Input
            id='name'
            type='text'
            placeholder='John Doe'
            autoComplete='name'
            disabled={isSubmitting}
            className={cn(
              'h-fit w-full border border-dark-15 bg-dark-10 p-[1rem] text-[0.875rem] leading-[1.5] shadow-[0px_0px_0px_3px_#191919]',
              errors.name && 'border-red-500',
            )}
            {...register('name')}
          />
          {errors.name && <p className='text-[0.875rem] text-red-500'>{errors.name.message}</p>}
        </div>

        {/* Email Input */}
        <div className='flex flex-col gap-[0.75rem]'>
          <Label htmlFor='email' className='text-[1rem] font-medium leading-[1.5]'>
            Email address
          </Label>
          <Input
            id='email'
            type='email'
            placeholder='hello@example.com'
            autoComplete='email'
            disabled={isSubmitting}
            className={cn(
              'h-fit w-full border border-dark-15 bg-dark-10 p-[1rem] text-[0.875rem] leading-[1.5] shadow-[0px_0px_0px_3px_#191919]',
              errors.email && 'border-red-500',
            )}
            {...register('email')}
          />
          {errors.email && <p className='text-[0.875rem] text-red-500'>{errors.email.message}</p>}
        </div>

        {/* Password Input */}
        <div className='flex flex-col gap-[0.75rem]'>
          <Label htmlFor='password' className='text-[1rem] font-medium leading-[1.5]'>
            Password
          </Label>
          <Input
            id='password'
            type='password'
            placeholder='••••••••'
            autoComplete='new-password'
            disabled={isSubmitting}
            className={cn(
              'h-fit w-full border border-dark-15 bg-dark-10 p-[1rem] text-[0.875rem] leading-[1.5] shadow-[0px_0px_0px_3px_#191919]',
              errors.password && 'border-red-500',
            )}
            {...register('password')}
          />
          {errors.password && (
            <p className='text-[0.875rem] text-red-500'>{errors.password.message}</p>
          )}
        </div>

        {/* Confirm Password Input */}
        <div className='flex flex-col gap-[0.75rem]'>
          <Label htmlFor='confirmPassword' className='text-[1rem] font-medium leading-[1.5]'>
            Confirm Password
          </Label>
          <Input
            id='confirmPassword'
            type='password'
            placeholder='••••••••'
            autoComplete='new-password'
            disabled={isSubmitting}
            className={cn(
              'h-fit w-full border border-dark-15 bg-dark-10 p-[1rem] text-[0.875rem] leading-[1.5] shadow-[0px_0px_0px_3px_#191919]',
              errors.confirmPassword && 'border-red-500',
            )}
            {...register('confirmPassword')}
          />
          {errors.confirmPassword && (
            <p className='text-[0.875rem] text-red-500'>{errors.confirmPassword.message}</p>
          )}
        </div>
      </div>

      <button
        type='submit'
        disabled={isSubmitting}
        className='w-full rounded-[0.5rem] bg-yellow-55 px-[2.125rem] py-[0.875rem] text-[0.875rem] font-medium leading-[1.71] text-dark-08 opacity-100 transition-opacity disabled:opacity-70'
      >
        {isSubmitting ? 'Creating account...' : 'Create account'}
      </button>
    </form>
  )
}

export default RegisterForm
