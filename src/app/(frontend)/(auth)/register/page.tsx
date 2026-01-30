'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import RegisterForm from './_components/register-form'

const RegisterPage = () => {
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

      <div className='w-full max-w-[30rem] space-y-[2.5rem]'>
        {/* Header */}
        <div className='w-full text-center'>
          <h2 className='font-kumbhSans text-[1.75rem] font-medium leading-[1.3] tracking-[-0.03em] lg:text-[2.75rem]'>
            Create Account
          </h2>
          <p className='mt-[0.375rem] text-[0.875rem] leading-[1.5] tracking-[-0.03em] text-grey-60 lg:text-[1rem]'>
            Sign up to start your journey
          </p>
        </div>

        {/* Form */}
        <RegisterForm />

        {/* Footer */}
        <div className='flex flex-col gap-[1.25rem]'>
          {/* Separator */}
          <div className='relative'>
            <div className='absolute inset-0 flex items-center'>
              <div className='w-full border-t border-dark-15' />
            </div>
            <div className='relative flex justify-center'>
              <span className='bg-dark-08 px-[0.625rem] text-[0.875rem] leading-[1.5] tracking-[-0.03em] text-grey-60 lg:text-[0.875rem]'>
                Already have an account?
              </span>
            </div>
          </div>
          <div className='flex justify-center'>
            <Link
              href='/login'
              className='text-center text-[0.875rem] leading-[1.5] tracking-[-0.03em] text-white lg:text-[0.875rem]'
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage
