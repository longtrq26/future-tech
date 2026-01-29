import { useContext } from 'react'
import { AuthContext } from '../providers/auth-provider'

/**
 * MỤC ĐÍCH:
 * Giúp các component con dễ dàng truy cập vào dữ liệu Auth (user, login, logout...)
 * mà không cần phải import cả useContext và AuthContext ở khắp mọi nơi.
 */
export const useAuth = () => {
  // 1. Sử dụng useContext để lấy 'giá trị' (value) đang nằm trong AuthContext.Provider
  const context = useContext(AuthContext)

  /**
   * 2. KIỂM TRA ĐIỀU KIỆN BIÊN (Guard Clause)
   *
   * Flow logic:
   * - Một Component muốn dùng useAuth() thì nó PHẢI là con của <AuthProvider>.
   * - Nếu context là undefined (hoặc null theo giá trị khởi tạo nếu không cẩn thận),
   *   nghĩa là lập trình viên đã quên bao bọc ứng dụng (hoặc trang đó) bằng <AuthProvider>.
   *
   * Tác dụng: Báo lỗi ngay lập tức ở môi trường phát triển (Development)
   * để tránh việc ứng dụng chạy sai logic mà không rõ nguyên nhân.
   */
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  // 3. Trả về toàn bộ dữ liệu (user, status, isLoading) và các hàm (login, logout, register...)
  // Các component chỉ cần: const { user, login } = useAuth()
  return context
}
