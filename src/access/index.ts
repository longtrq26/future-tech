import { Access, FieldAccess } from 'payload'
import { ROLES } from './roles'

// Check xem user có phải Admin không
export const isAdmin: Access = ({ req: { user } }) => {
  return Boolean(user?.role === ROLES.ADMIN)
}

export const isAdminFieldLevel: FieldAccess = ({ req: { user } }) => {
  return Boolean(user?.role === ROLES.ADMIN)
}

// Check xem user có phải Writer hoặc Admin không
export const isAdminOrWriter: Access = ({ req: { user } }) => {
  return Boolean(user?.role === ROLES.ADMIN || user?.role === ROLES.WRITER)
}

// Check xem user có phải người tạo ra document (dựa trên field createdBy) hoặc là Admin
export const isAdminOrOwner: Access = ({ req: { user } }) => {
  if (!user) return false
  if (user.role === ROLES.ADMIN) return true

  return {
    createdBy: {
      equals: user.id,
    },
  }
}

// Alias cho isAdminOrOwner để code dễ đọc hơn trong ngữ cảnh bài viết
export const isAdminOrAuthor = isAdminOrOwner

// Check xem user có phải chính mình không (hoặc là Admin)
export const isSelfOrAdmin: Access = ({ req: { user } }) => {
  // Nếu chưa đăng nhập -> Cấm
  if (!user) return false

  // Nếu là Admin -> Cho phép hết
  if (user.role === ROLES.ADMIN) return true

  // Nếu là User/Writer -> Chỉ cho phép nếu ID trùng với ID của chính mình
  return {
    id: {
      equals: user.id,
    },
  }
}

export const isSelfOrAdminFieldLevel: FieldAccess = ({ req: { user }, id }) => {
  // 1. Nếu chưa đăng nhập -> Cấm
  if (!user) return false

  // 2. Nếu là Admin -> Cho phép hết
  if (user.role === ROLES.ADMIN) return true

  // 3. Nếu là User -> So sánh ID của user hiện tại với ID của document đang truy cập
  // Lưu ý: FieldAccess trả về boolean, không trả về query object
  return user.id === id
}

// Logic xem bài viết (Read Access)
// - Admin/Writer: Xem được hết (cả Draft & Published)
// - User/Guest: Chỉ xem được bài đã Published
export const readAccess: Access = ({ req: { user } }) => {
  // Nếu là Admin hoặc Writer thì cho xem hết (để còn preview bài nháp)
  if (user?.role === ROLES.ADMIN || user?.role === ROLES.WRITER) {
    return true
  }

  // Nếu là User thường hoặc Guest, chỉ trả về bài có _status = published
  return {
    _status: {
      equals: 'published',
    },
  }
}

// Logic cho Comment/Interaction
// Chỉ cho phép update/delete nếu chính user đó tạo ra
export const isOwnerOrAdmin = isAdminOrOwner
