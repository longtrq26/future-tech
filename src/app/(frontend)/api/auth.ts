import { User } from '@/payload-types'

export type RegisterData = {
  email: string
  password: string
  name: string
}

export const authApi = {
  me: async (): Promise<{ user: User | null }> => {
    const res = await fetch('/api/users/me', {
      headers: {
        'Cache-Control': 'no-cache',
      },
    })
    if (!res.ok) return { user: null }
    const data = await res.json()
    return { user: data?.user || null }
  },

  login: async (email: string, password: string): Promise<{ user: User; message?: string }> => {
    const res = await fetch('/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })

    if (!res.ok) {
      let errorMessage = 'Login failed'
      try {
        const error = await res.json()
        errorMessage = error.message || error.errors?.[0]?.message || errorMessage
      } catch (_) {
        // ignore json parse error
      }
      throw new Error(errorMessage)
    }

    const data = await res.json()
    return { user: data.user, message: data.message }
  },

  logout: async (): Promise<void> => {
    await fetch('/api/users/logout', { method: 'POST' })
  },

  register: async (data: RegisterData): Promise<{ user: User; message?: string }> => {
    const res = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (!res.ok) {
      let errorMessage = 'Registration failed'
      try {
        const error = await res.json()
        errorMessage = error.message || error.errors?.[0]?.message || errorMessage
      } catch (_) {
        // ignore json parse error
      }
      throw new Error(errorMessage)
    }

    const resData = await res.json()
    return { user: resData.doc, message: resData.message }
  },

  verifyEmail: async (token: string): Promise<boolean> => {
    const res = await fetch(`/api/users/verify/${token}`, {
      method: 'POST',
    })
    return res.ok
  },

  refreshToken: async (): Promise<{ user: User } | null> => {
    const res = await fetch('/api/users/refresh-token', {
      method: 'POST',
    })
    if (res.ok) {
      const data = await res.json()
      return { user: data.user }
    }
    return null
  },

  forgotPassword: async (email: string): Promise<boolean> => {
    const res = await fetch('/api/users/forgot-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    })
    return res.ok
  },

  resetPassword: async (token: string, password: string): Promise<boolean> => {
    const res = await fetch('/api/users/reset-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token, password }),
    })

    if (!res.ok) {
      let errorMessage = 'Reset password failed'
      try {
        const error = await res.json()
        errorMessage = error.message || error.errors?.[0]?.message || errorMessage
      } catch (_) {
        // ignore
      }
      throw new Error(errorMessage)
    }
    return true
  },
}
