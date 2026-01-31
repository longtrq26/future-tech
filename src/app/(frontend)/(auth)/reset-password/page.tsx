'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { ResetPasswordFormValues, resetPasswordSchema } from '@/validations/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import ICClose from '@/components/icons/ic-close'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { authApi } from '@/app/(frontend)/api/auth'

const ResetPasswordPage = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  const [serverError, setServerError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  })

  const onSubmit = async (data: ResetPasswordFormValues) => {
    if (!token) {
      setServerError('Invalid or missing reset token.')
      return
    }

    try {
      setServerError(null)
      await authApi.resetPassword(token, data.password)
      toast.success('Password reset successfully')
      router.push('/login')
    } catch (err) {
      if (err instanceof Error) {
        setServerError(err.message || 'Failed to reset password.')
      } else {
        setServerError('Failed to reset password.')
      }
    }
  }

  if (!token) {
    return (
      <div className='flex min-h-screen flex-col items-center justify-center gap-4 text-center'>
        <h1 className='text-2xl font-bold text-red-500'>Invalid Link</h1>
        <p className='text-grey-60'>The password reset link is invalid or expired.</p>
        <Link href='/login' className='text-yellow-55 hover:underline'>
          Back to Login
        </Link>
      </div>
    )
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
            Reset Password
          </h2>
          <p className='mt-[0.375rem] text-[0.875rem] leading-[1.5] tracking-[-0.03em] text-grey-60 lg:text-[1rem]'>
            Enter your new password below
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

        <form
          className='mx-auto w-full max-w-[19.875rem] space-y-[1.25rem] lg:max-w-[21.8125rem] lg:space-y-[1.875rem]'
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className='space-y-[1rem]'>
            {/* New Password Input */}
            <div className='flex flex-col gap-[0.75rem]'>
              <Label htmlFor='password' className='text-[1rem] font-medium leading-[1.5]'>
                New Password
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
                Confirm New Password
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
            className='w-full rounded-[0.5rem] bg-yellow-55 px-[2.125rem] py-[0.875rem] text-[0.875rem] font-medium leading-[1.71] text-dark-08 transition-all hover:bg-yellow-60 disabled:cursor-not-allowed disabled:opacity-70'
          >
            {isSubmitting ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default ResetPasswordPage
