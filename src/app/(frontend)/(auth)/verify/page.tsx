'use client'

import React, { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import ICClose from '@/components/icons/ic-close'
import { authApi } from '@/app/(frontend)/api/auth'

const VerifyPage = () => {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying')
  const [message, setMessage] = useState('')

  const verifyEmail = useCallback(async (verificationToken: string) => {
    try {
      const success = await authApi.verifyEmail(verificationToken)
      if (success) {
        setStatus('success')
        setMessage('Your email has been verified successfully!')
      } else {
        setStatus('error')
        setMessage('Verification failed. The link may be expired.')
      }
    } catch (_) {
      setStatus('error')
      setMessage('An error occurred during verification.')
    }
  }, [])

  useEffect(() => {
    if (token) {
      verifyEmail(token)
    } else {
      setStatus('error')
      setMessage('Invalid verification link.')
    }
  }, [token, verifyEmail])

  return (
    <div className='container flex min-h-screen w-full flex-col items-center justify-center gap-[1.25rem] py-[1.25rem] lg:py-[3.75rem]'>
      {/* Logo */}
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

      <div className='w-full max-w-[30rem] space-y-[2.5rem] text-center'>
        {/* Header */}
        <div>
          <h2 className='font-kumbhSans text-[1.75rem] font-medium leading-[1.3] tracking-[-0.03em] lg:text-[2.75rem]'>
            Email Verification
          </h2>
          <p className='mt-[0.375rem] text-[0.875rem] leading-[1.5] tracking-[-0.03em] text-grey-60 lg:text-[1rem]'>
            {status === 'verifying' && 'Verifying your email...'}
            {status === 'success' && 'Success!'}
            {status === 'error' && 'Error'}
          </p>
        </div>

        {/* Content Status */}
        <div className='flex flex-col items-center justify-center gap-4'>
          {status === 'verifying' && (
            <div className='h-8 w-8 animate-spin rounded-full border-2 border-yellow-55 border-t-transparent' />
          )}

          {status === 'success' && (
            <div className='w-full rounded-[0.375rem] border border-green-500 bg-green-500/10 p-[1rem]'>
              <p className='text-[0.875rem] text-green-500'>{message}</p>
            </div>
          )}

          {status === 'error' && (
            <div className='w-full rounded-[0.375rem] border border-red-500 bg-red-500/10 p-[1rem]'>
              <div className='flex items-center justify-center gap-2'>
                <div className='flex size-[1.25rem] flex-shrink-0 items-center justify-center rounded-full bg-red-500'>
                  <ICClose className='size-[0.625rem] text-white' />
                </div>
                <p className='text-[0.875rem] text-red-500'>{message}</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className='flex justify-center'>
          <Link
            href='/login'
            className='w-full max-w-[200px] rounded-[0.5rem] bg-yellow-55 px-[2.125rem] py-[0.875rem] text-[0.875rem] font-medium leading-[1.71] text-dark-08 transition-all hover:bg-yellow-60'
          >
            Go to Login
          </Link>
        </div>
      </div>
    </div>
  )
}

export default VerifyPage
