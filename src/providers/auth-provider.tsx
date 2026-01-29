'use client'

import React, { createContext, useCallback, useEffect, useState } from 'react'
import { authApi, RegisterData } from '@/api/auth'
import { AuthUser } from '@/types/auth'

/**
 * Định nghĩa kiểu dữ liệu cho Context
 * Bao gồm trạng thái (state) và các hàm thao tác (actions)
 */
type AuthContextType = {
  user: AuthUser | null // Thông tin user hiện tại (null nếu chưa login)
  setUser: (user: AuthUser | null) => void
  isLoading: boolean // Trạng thái đang check session khi mới load trang
  login: (email: string, password: string) => Promise<AuthUser>
  logout: () => Promise<void>
  register: (data: RegisterData) => Promise<AuthUser>
  verifyEmail: (token: string) => Promise<boolean>
  // Trạng thái cụ thể của Auth giúp UI xử lý nhanh (ví dụ: bảo vệ route)
  status: 'loading' | 'loggedIn' | 'loggedOut'
}

/**
 * Khởi tạo giá trị mặc định cho Context
 */
export const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => null,
  isLoading: true,
  login: () => Promise.resolve({} as AuthUser),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve({} as AuthUser),
  verifyEmail: () => Promise.resolve(false),
  status: 'loading',
})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  /**
   * KIỂM TRA PHIÊN ĐĂNG NHẬP (SESSION PERSISTENCE)
   * Hàm này gọi API /me để kiểm tra xem browser còn cookie/token hợp lệ không.
   * Dùng useCallback để tránh hàm bị khởi tạo lại vô tận trong useEffect.
   */
  const fetchUser = useCallback(async () => {
    setIsLoading(true)
    try {
      const { user } = await authApi.me() // Gọi API lấy thông tin user hiện tại
      setUser(user)
    } catch (error) {
      // Nếu lỗi (401, 403...) đồng nghĩa chưa login hoặc token hết hạn
      console.error(error)
      setUser(null)
    } finally {
      setIsLoading(false)
    }
  }, [])

  /**
   * Chạy duy nhất 1 lần khi ứng dụng khởi chạy (hoặc khi refresh trang)
   */
  useEffect(() => {
    fetchUser()
  }, [fetchUser])

  /**
   * ĐĂNG KÝ
   * Gọi API tạo user mới. Thường sau khi đăng ký có thể bắt user login
   * hoặc server tự động login và trả về user.
   */
  const register = async (data: RegisterData): Promise<AuthUser> => {
    const { user } = await authApi.register(data)
    return user
  }

  /**
   * XÁC THỰC EMAIL
   * Dùng token từ URL gửi lên server để kích hoạt tài khoản
   */
  const verifyEmail = async (token: string): Promise<boolean> => {
    return await authApi.verifyEmail(token)
  }

  /**
   * ĐĂNG NHẬP
   * 1. Gọi API login
   * 2. Nếu thành công, cập nhật state 'user' -> UI tự động chuyển sang trạng thái loggedIn
   */
  const login = async (email: string, password: string): Promise<AuthUser> => {
    const { user } = await authApi.login(email, password)
    setUser(user)
    return user
  }

  /**
   * ĐĂNG XUẤT
   * 1. Gọi API logout để xóa cookie/session ở server
   * 2. Xóa thông tin user ở client state
   */
  const logout = async () => {
    try {
      await authApi.logout()
      setUser(null)
    } catch (error) {
      console.error('Logout failed', error)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isLoading,
        login,
        logout,
        register,
        verifyEmail,
        // Xác định trạng thái nhanh để UI render (Loading -> LoggedIn hoặc LoggedOut)
        status: isLoading ? 'loading' : user ? 'loggedIn' : 'loggedOut',
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
