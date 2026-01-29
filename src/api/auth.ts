import { User } from '@/payload-types'

/**
 * Định nghĩa cấu trúc dữ liệu gửi lên khi đăng ký.
 */
export type RegisterData = {
  email: string
  password: string
  name: string
}

/**
 * Object chứa các hàm gọi API liên quan đến Authentication.
 * Hầu hết các hàm này sẽ tương tác với các Endpoint mặc định của Payload CMS.
 */
export const authApi = {
  /**
   * ĐĂNG KÝ TÀI KHOẢN MỚI
   */
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
    /**
     * Payload CMS khi dùng method POST vào collection (create)
     * sẽ trả về bản ghi nằm trong trường 'doc'.
     */
    return { user: resData.doc, message: resData.message }
  },

  /**
   * XÁC THỰC EMAIL
   * Token được lấy từ đường link trong Email mà người dùng click vào.
   */
  verifyEmail: async (token: string): Promise<boolean> => {
    const res = await fetch(`/api/users/verify/${token}`, {
      method: 'POST',
    })
    return res.ok // Trả về true nếu xác thực thành công
  },

  /**
   * ĐĂNG NHẬP
   */
  login: async (email: string, password: string): Promise<{ user: User; message?: string }> => {
    const res = await fetch('/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })

    // Nếu Login thất bại (sai pass, email không tồn tại...)
    if (!res.ok) {
      let errorMessage = 'Login failed'
      try {
        const error = await res.json()

        // Cố gắng lấy thông tin lỗi chi tiết từ Server trả về
        errorMessage = error.message || error.errors?.[0]?.message || errorMessage
      } catch (_) {
        // Nếu không parse được JSON, giữ nguyên lỗi mặc định
      }
      throw new Error(errorMessage)
    }

    const data = await res.json()
    return { user: data.user, message: data.message }
  },

  /**
   * LẤY THÔNG TIN USER HIỆN TẠI (SESSION CHECK)
   * Hàm này được gọi mỗi khi Refresh trang để xem người dùng còn Login hay không.
   */
  me: async (): Promise<{ user: User | null }> => {
    const res = await fetch('/api/users/me', {
      headers: {
        // 'no-cache' để đảm bảo trình duyệt luôn hỏi Server thay vì lấy dữ liệu cũ trong cache
        'Cache-Control': 'no-cache',
      },
    })

    // Nếu không ok (ví dụ 401 Unauthorized), coi như chưa đăng nhập
    if (!res.ok) return { user: null }

    const data = await res.json()
    // Payload CMS trả về user trong object data.user
    return { user: data?.user || null }
  },

  /**
   * LÀM MỚI TOKEN (REFRESH SESSION)
   * Giúp kéo dài thời gian đăng nhập mà không bắt người dùng nhập lại pass.
   */
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

  /**
   * ĐĂNG XUẤT
   * Gửi request lên server để xóa Cookie/Session.
   */
  logout: async (): Promise<void> => {
    await fetch('/api/users/logout', { method: 'POST' })
  },
}
