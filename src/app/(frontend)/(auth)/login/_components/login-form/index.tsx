import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { loginFormSchema, LoginFormValues } from '@/validations/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import { ROLES } from '@/access/roles'
import { useAuth } from '@/hooks/use-auth'
import ICClose from '@/components/icons/ic-close'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const LoginForm = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { login, status, user } = useAuth()
  const [serverError, setServerError] = useState<string | null>(null)

  // Get return url
  const origin = searchParams.get('origin')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  // Redirect if logged in
  useEffect(() => {
    if (status === 'loggedIn' && user) {
      let destination = '/'

      if (user.role === ROLES.ADMIN || user.role === ROLES.WRITER) {
        destination = origin ? `/${origin}` : '/admin'
      } else {
        // Regular user
        if (origin && origin !== 'admin') {
          destination = `/${origin}`
        } else {
          destination = '/'
        }
      }

      router.push(destination)
      router.refresh()
    }
  }, [status, user, router, origin])

  const onSubmit = async (data: LoginFormValues) => {
    try {
      setServerError(null)
      await login(data.email, data.password)
      toast.success('Logged in successfully')
    } catch (err) {
      if (err instanceof Error) {
        // Bây giờ err đã được định danh là kiểu Error, có thể lấy .message
        setServerError(err.message)
      } else {
        // Trường hợp lỗi không xác định (hiếm gặp)
        setServerError('Authentication failed')
      }
      toast.error('Login failed')
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
                Authentication Error
              </h3>
              <div className='mt-[0.25rem] text-[0.875rem] leading-[1.5] tracking-[-0.03em] text-red-500'>
                {serverError}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className='space-y-[1rem]'>
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
            autoComplete='current-password'
            disabled={isSubmitting}
            className={cn(
              'h-fit w-full border border-dark-15 bg-dark-10 p-[1rem] text-[0.875rem] leading-[1.5] shadow-[0px_0px_0px_3px_#191919]',
              errors.password && 'border-red-500',
            )}
            {...register('password')}
          />
        </div>
      </div>

      <div className='flex items-center justify-between'>
        <div className='flex items-center'>
          <Checkbox
            id='remember-me'
            name='remember-me'
            className='size-[1.5rem] border-dark-15 bg-dark-10 data-[state=checked]:bg-dark-10'
          />
          <Label
            htmlFor='remember-me'
            className='ml-[0.375rem] text-[0.875rem] leading-[1.5] tracking-[-0.03em] text-grey-60 lg:text-[1rem]'
          >
            Remember me
          </Label>
        </div>

        <Link
          href='/forgot-password'
          className='text-[0.875rem] font-medium leading-[1.5] tracking-[-0.03em] text-yellow-55 lg:text-[1rem]'
        >
          Forgot your password?
        </Link>
      </div>

      <button
        type='submit'
        disabled={isSubmitting}
        className='w-full rounded-[0.5rem] bg-yellow-55 px-[2.125rem] py-[0.875rem] text-[0.875rem] font-medium leading-[1.71] text-dark-08'
      >
        {isSubmitting ? 'Signing in...' : 'Sign in'}
      </button>
    </form>
  )
}

export default LoginForm
