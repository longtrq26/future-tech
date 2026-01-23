# 7. Security & Access Control

## 7.1. Authentication System

### 7.1.1. JWT-Based Authentication

Payload CMS sử dụng JWT (JSON Web Tokens) cho authentication.

**Configuration**:

- **Secret**: `PAYLOAD_SECRET` (minimum 32 characters)
- **Expiration**: `PAYLOAD_JWT_EXPIRATION` (default: 3 hours = 10800 seconds)
- **Storage**: HTTP-only cookie
- **Cookie Settings**:
  - `secure`: true trong production (HTTPS only)
  - `sameSite`: 'Lax'

### 7.1.2. Login Security

**Max Login Attempts**: 5

- Sau 5 lần login thất bại, account bị lock

**Lock Time**: 10 minutes (600,000ms)

- Account bị lock trong 10 phút sau khi vượt quá max attempts

**Email Verification**: Required

- Users phải verify email trước khi có thể login

### 7.1.3. Password Requirements

Payload CMS không enforce password requirements mặc định. Nên implement custom validation nếu cần:

```typescript
// Example: Custom password validation
{
  name: 'password',
  type: 'text',
  required: true,
  validate: (value) => {
    if (value.length < 8) {
      return 'Password must be at least 8 characters'
    }
    if (!/[A-Z]/.test(value)) {
      return 'Password must contain at least one uppercase letter'
    }
    if (!/[0-9]/.test(value)) {
      return 'Password must contain at least one number'
    }
    return true
  },
}
```

## 7.2. Role-Based Access Control (RBAC)

### 7.2.1. Roles

Hệ thống có 3 roles:

| Role       | Description    | Permissions                                             |
| ---------- | -------------- | ------------------------------------------------------- |
| **admin**  | Administrator  | Full access to all collections                          |
| **writer** | Content Writer | Can create/update content (posts, categories, tags)     |
| **user**   | Regular User   | Can create comments, likes. Read-only access to content |

### 7.2.2. Role Storage

Roles được lưu trong:

- **Database**: `users.role` field
- **JWT Token**: `saveToJWT: true` - role được include trong JWT để fast access checks

### 7.2.3. Access Control Functions

**File**: `src/access/index.ts`

#### Collection-Level Access

| Function          | Description             | Usage                                       |
| ----------------- | ----------------------- | ------------------------------------------- |
| `isAdmin`         | Admin only              | Delete operations                           |
| `isAdminOrWriter` | Admin or Writer         | Create/update content                       |
| `isAdminOrOwner`  | Admin or document owner | Update/delete user content                  |
| `isSelfOrAdmin`   | Self or Admin           | User profile access                         |
| `readAccess`      | Conditional read        | Posts (published only for non-admin/writer) |

#### Field-Level Access

| Function                  | Description   | Usage       |
| ------------------------- | ------------- | ----------- |
| `isAdminFieldLevel`       | Admin only    | Role field  |
| `isSelfOrAdminFieldLevel` | Self or Admin | Email field |

## 7.3. Collection Access Control

### 7.3.1. Users Collection

```typescript
access: {
  read: () => true, // Public read
  create: () => true, // Public registration
  update: isSelfOrAdmin, // Self or admin
  delete: isAdmin, // Admin only
}
```

**Field-Level**:

- `email`: `isSelfOrAdminFieldLevel` - Only self or admin can read
- `role`: `isAdminFieldLevel` - Only admin can create/update

### 7.3.2. Posts Collection

```typescript
access: {
  read: readAccess, // Published only (except admin/writer)
  create: isAdminOrWriter, // Admin or writer
  update: isAdminOrOwner, // Admin or owner
  delete: isAdminOrOwner, // Admin or owner
}
```

**Read Access Logic**:

- **Admin/Writer**: Read all posts (including drafts)
- **Others**: Only published posts (`_status: 'published'`)

### 7.3.3. Categories Collection

```typescript
access: {
  read: () => true, // Public read
  create: isAdminOrWriter, // Admin or writer
  update: isAdminOrWriter, // Admin or writer
  delete: isAdmin, // Admin only
}
```

### 7.3.4. Tags Collection

```typescript
access: {
  read: () => true, // Public read
  create: isAdminOrWriter, // Admin or writer
  update: isAdminOrWriter, // Admin or writer
  delete: isAdmin, // Admin only
}
```

### 7.3.5. Comments Collection

```typescript
access: {
  read: () => true, // Public read
  create: ({ req: { user } }) => Boolean(user), // Authenticated users
  update: isAdminOrOwner, // Admin or owner
  delete: isAdminOrOwner, // Admin or owner
}
```

### 7.3.6. Likes Collection

```typescript
access: {
  read: () => true, // Public read
  create: ({ req: { user } }) => Boolean(user), // Authenticated users
  update: () => false, // Disabled (binary like system)
  delete: isAdminOrOwner, // Admin or owner
}
```

### 7.3.7. Media Collection

```typescript
access: {
  read: () => true, // Public read
  create: isAdminOrWriter, // Admin or writer
  update: isAdminOrOwner, // Admin or owner
  delete: isAdminOrOwner, // Admin or owner
}
```

## 7.4. CORS & CSRF Protection

### 7.4.1. CORS Configuration

```typescript
cors: [env.NEXT_PUBLIC_APP_URL, env.NEXT_PUBLIC_API_URL].filter((url): url is string => !!url)
```

**Features**:

- Whitelist-based: Chỉ các origins được cấu hình mới có thể access
- Dynamic: Filter out empty/null URLs
- Applied to all API endpoints

### 7.4.2. CSRF Protection

```typescript
csrf: [env.NEXT_PUBLIC_APP_URL, env.NEXT_PUBLIC_API_URL].filter((url): url is string => !!url)
```

**Features**:

- Same-origin policy enforcement
- Token-based protection
- Applied to state-changing operations (POST, PATCH, DELETE)

## 7.5. Data Validation

### 7.5.1. Field Validation

Payload CMS tự động validate fields dựa trên type và constraints:

- **Required fields**: Enforced tại API level
- **Unique constraints**: Enforced tại database level
- **Type validation**: Automatic (email, date, number, etc.)
- **Relationship validation**: Verify related documents exist

### 7.5.2. Custom Validation

Có thể thêm custom validation:

```typescript
{
  name: 'email',
  type: 'email',
  validate: (value) => {
    if (!value.endsWith('@example.com')) {
      return 'Email must be from example.com domain'
    }
    return true
  },
}
```

## 7.6. SQL Injection Prevention

Payload CMS sử dụng parameterized queries, tự động prevent SQL injection:

- **ORM Layer**: Payload CMS abstract database layer
- **Parameter Binding**: All queries use parameter binding
- **No Raw Queries**: Không expose raw SQL queries

## 7.7. XSS Prevention

### 7.7.1. Rich Text Editor

Lexical editor tự động sanitize HTML content:

- **Sanitization**: Built-in HTML sanitization
- **Allowed Tags**: Configurable
- **Script Blocking**: Scripts automatically blocked

### 7.7.2. Text Fields

Text fields được escape khi render:

- **Automatic Escaping**: Next.js và React tự động escape
- **No Raw HTML**: Không render raw HTML từ text fields

## 7.8. File Upload Security

### 7.8.1. MIME Type Validation

```typescript
mimeTypes: [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/avif',
  'application/pdf',
  'video/mp4',
  'video/webm',
  'video/ogg',
  'video/quicktime',
]
```

**Features**:

- Whitelist-based: Chỉ các MIME types được allow mới có thể upload
- Server-side validation: Validate cả client và server
- File extension check: Verify file extension matches MIME type

### 7.8.2. File Size Limits

Nên implement file size limits ở:

- **Next.js**: `next.config.mjs` - `bodyParser.sizeLimit`
- **Reverse Proxy**: Nginx, Cloudflare
- **Storage**: S3 bucket policies

### 7.8.3. Storage Security

- **Private ACL**: Files không public-read
- **Signed URLs**: Generate signed URLs khi cần access
- **Access Control**: Media collection access control

## 7.9. Environment Variables Security

### 7.9.1. Secret Management

- **Never Commit**: Không commit secrets vào git
- **Environment Files**: Sử dụng `.env` files (gitignored)
- **Production**: Sử dụng secure secret management (AWS Secrets Manager, Vercel Secrets, etc.)

### 7.9.2. Validation

- **Runtime Validation**: Validate tất cả env vars tại startup
- **Type Safety**: TypeScript types từ Zod schemas
- **Required Fields**: Enforce required fields

## 7.10. Security Best Practices

### 7.10.1. Authentication

1. ✅ Use strong `PAYLOAD_SECRET` (min 32 chars, random)
2. ✅ Set appropriate JWT expiration
3. ✅ Enable email verification
4. ✅ Implement rate limiting cho login
5. ✅ Use HTTPS trong production

### 7.10.2. Access Control

1. ✅ Principle of least privilege
2. ✅ Field-level access control cho sensitive data
3. ✅ Owner-based access cho user-generated content
4. ✅ Regular audit access control rules

### 7.10.3. Data Protection

1. ✅ Validate all inputs
2. ✅ Sanitize rich text content
3. ✅ Use parameterized queries (automatic)
4. ✅ Encrypt sensitive data at rest (database encryption)

### 7.10.4. API Security

1. ✅ CORS whitelist only trusted origins
2. ✅ CSRF protection enabled
3. ✅ Rate limiting (implement at infrastructure level)
4. ✅ Input validation và sanitization

### 7.10.5. File Upload

1. ✅ MIME type validation
2. ✅ File size limits
3. ✅ Private storage (no public-read)
4. ✅ Virus scanning (implement at infrastructure level)

### 7.10.6. Monitoring

1. ✅ Log authentication failures
2. ✅ Monitor suspicious activity
3. ✅ Alert on multiple failed login attempts
4. ✅ Regular security audits

## 7.11. Security Checklist

### Development

- [ ] Strong `PAYLOAD_SECRET` generated
- [ ] All environment variables validated
- [ ] Access control tested cho tất cả collections
- [ ] Field-level access tested
- [ ] File upload validation tested
- [ ] CORS configured correctly

### Production

- [ ] HTTPS enabled
- [ ] Secure cookies enabled
- [ ] Environment variables secured
- [ ] Database connections encrypted (SSL)
- [ ] Rate limiting implemented
- [ ] Monitoring và alerting setup
- [ ] Backup và recovery plan
- [ ] Security headers configured (Next.js)
- [ ] Regular security updates
