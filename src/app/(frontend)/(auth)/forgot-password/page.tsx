'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ForgotPasswordFormValues, forgotPasswordSchema } from '@/validations/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import ICClose from '@/components/icons/ic-close'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { authApi } from '@/app/(frontend)/api/auth'

const ForgotPasswordPage = () => {
  const [success, setSuccess] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  })

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    try {
      setServerError(null)
      await authApi.forgotPassword(data.email)
      setSuccess(true)
      toast.success('Reset email sent successfully')
    } catch (_) {
      setServerError('Failed to send reset email. Please try again.')
    }
  }

  return (
    <div className='container flex min-h-screen w-full flex-col items-center justify-center gap-[1.25rem] py-[1.25rem] lg:py-[3.75rem]'>
      <Link href={'/'} className='relative h-[2.188rem] w-[7.827rem] lg:h-[2.5rem] lg:w-[8.946rem]'>
        <Image
          src={'/logo-mb.svg'}
          alt='Future Tech'
          fill
          priority
          className='object-contain lg:hidden'
        />
        <Image
          src={'/logo.svg'}
          alt='Future Tech'
          fill
          priority
          className='hidden object-contain lg:block'
        />
      </Link>

      <div className='w-full max-w-[30rem] space-y-[2.5rem]'>
        <div className='w-full text-center'>
          <h2 className='font-kumbhSans text-[1.75rem] font-medium leading-[1.3] tracking-[-0.03em] lg:text-[2.75rem]'>
            Forgot Password
          </h2>
          <p className='mt-[0.375rem] text-[0.875rem] leading-[1.5] tracking-[-0.03em] text-grey-60 lg:text-[1rem]'>
            Enter your email to receive a password reset link
          </p>
        </div>

        {/* Server Error Alert */}
        {serverError && (
          <div className='rounded-[0.375rem] border border-red-500 bg-red-500/10 p-[1rem]'>
            <div className='flex'>
              <div className='flex size-[1.25rem] flex-shrink-0 items-center justify-center rounded-full bg-red-500'>
                <ICClose className='size-[0.625rem] text-white' />
              </div>
              <div className='ml-[0.375rem]'>
                <h3 className='text-[0.875rem] leading-[1.5] tracking-[-0.03em] text-red-500'>
                  Error
                </h3>
                <div className='mt-[0.25rem] text-[0.875rem] leading-[1.5] tracking-[-0.03em] text-red-500'>
                  {serverError}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Success Message */}
        {success ? (
          <div className='rounded-[0.375rem] border border-green-500 bg-green-500/10 p-[1rem] text-center'>
            <p className='text-[0.875rem] text-green-500'>
              If that email address is in our database, we will send you an email to reset your
              password.
            </p>
            <Link
              href='/login'
              className='mt-4 inline-block text-[0.875rem] font-medium text-yellow-55 hover:underline'
            >
              Back to Login
            </Link>
          </div>
        ) : (
          <form
            className='mx-auto w-full max-w-[19.875rem] space-y-[1.25rem] lg:max-w-[21.8125rem] lg:space-y-[1.875rem]'
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className='space-y-[1rem]'>
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
                {errors.email && (
                  <p className='text-[0.875rem] text-red-500'>{errors.email.message}</p>
                )}
              </div>
            </div>

            <button
              type='submit'
              disabled={isSubmitting}
              className='w-full rounded-[0.5rem] bg-yellow-55 px-[2.125rem] py-[0.875rem] text-[0.875rem] font-medium leading-[1.71] text-dark-08 transition-all hover:bg-yellow-60 disabled:cursor-not-allowed disabled:opacity-70'
            >
              {isSubmitting ? 'Sending...' : 'Send Reset Link'}
            </button>
            <div className='text-center'>
              <Link
                href='/login'
                className='text-[0.875rem] text-grey-60 transition-colors hover:text-white'
              >
                Back to Login
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

export default ForgotPasswordPage
