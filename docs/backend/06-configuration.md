# 6. Configuration

## 6.1. Payload Configuration

**File**: `src/payload.config.ts`

### 6.1.1. Administrative Settings

```typescript
admin: {
  user: Users.slug, // 'users' - collection used for authentication
  importMap: {
    baseDir: path.resolve(dirname), // Base directory for import maps
  },
}
```

### 6.1.2. Security Settings

```typescript
secret: env.PAYLOAD_SECRET, // Secret key for JWT signing (min 32 chars)
serverURL: env.NEXT_PUBLIC_APP_URL, // Base URL of the application
cors: [env.NEXT_PUBLIC_APP_URL, env.NEXT_PUBLIC_API_URL].filter(...), // Allowed CORS origins
csrf: [env.NEXT_PUBLIC_APP_URL, env.NEXT_PUBLIC_API_URL].filter(...), // Allowed CSRF origins
```

### 6.1.3. Collections & Globals

```typescript
collections: [Users, Media, Categories, Tags, Posts, Comments, Likes],
globals: [], // No globals currently
```

### 6.1.4. Editor & Image Processing

```typescript
editor: lexicalEditor(), // Lexical rich text editor
sharp, // Sharp library for image processing
```

### 6.1.5. Adapters

```typescript
db: databaseAdapter, // PostgreSQL adapter
email: smtpAdapter, // SMTP email adapter
plugins: [storageAdapter], // S3 storage plugin
```

### 6.1.6. GraphQL

```typescript
graphQL: {
  disable: true, // GraphQL API disabled
}
```

### 6.1.7. Localization

```typescript
localization: {
  locales: ['en', 'vi'], // Supported locales
  defaultLocale: 'en', // Default locale
  fallback: true, // Enable fallback to default locale
}
```

### 6.1.8. TypeScript

```typescript
typescript: {
  outputFile: path.resolve(dirname, 'payload-types.ts'), // Generated types file
}
```

## 6.2. Environment Variables

**File**: `src/config/env/index.ts`

Environment variables được validate bằng Zod và `@t3-oss/env-nextjs`.

### 6.2.1. Server Variables

#### Database

| Variable       | Type | Required | Description                  |
| -------------- | ---- | -------- | ---------------------------- |
| `DATABASE_URL` | URL  | ✅       | PostgreSQL connection string |

**Example**:

```
DATABASE_URL=postgres://user:password@localhost:5432/dbname
```

#### Payload Security

| Variable                 | Type            | Required | Description                    |
| ------------------------ | --------------- | -------- | ------------------------------ |
| `PAYLOAD_SECRET`         | string (min 32) | ✅       | Secret key for JWT signing     |
| `PAYLOAD_JWT_EXPIRATION` | string          | ✅       | JWT expiration time in seconds |

**Example**:

```
PAYLOAD_SECRET=your-secret-key-min-32-characters-long
PAYLOAD_JWT_EXPIRATION=10800
```

#### S3 Storage

| Variable               | Type   | Required | Description                 |
| ---------------------- | ------ | -------- | --------------------------- |
| `S3_ENDPOINT`          | URL    | ✅       | S3-compatible endpoint      |
| `S3_ACCESS_KEY_ID`     | string | ✅       | S3 access key               |
| `S3_SECRET_ACCESS_KEY` | string | ✅       | S3 secret key               |
| `S3_BUCKET_NAME`       | string | ✅       | S3 bucket name              |
| `S3_REGION`            | string | ✅       | S3 region (default: 'auto') |

**Example** (Cloudflare R2):

```
S3_ENDPOINT=https://xxx.r2.cloudflarestorage.com
S3_ACCESS_KEY_ID=your-access-key
S3_SECRET_ACCESS_KEY=your-secret-key
S3_BUCKET_NAME=your-bucket-name
S3_REGION=auto
```

**Example** (AWS S3):

```
S3_ENDPOINT=https://s3.amazonaws.com
S3_ACCESS_KEY_ID=your-access-key
S3_SECRET_ACCESS_KEY=your-secret-key
S3_BUCKET_NAME=your-bucket-name
S3_REGION=us-east-1
```

#### SMTP Email

| Variable            | Type    | Required | Description              |
| ------------------- | ------- | -------- | ------------------------ |
| `SMTP_HOST`         | string  | ✅       | SMTP server hostname     |
| `SMTP_PORT`         | number  | ✅       | SMTP server port         |
| `SMTP_USER`         | string  | ✅       | SMTP username            |
| `SMTP_PASSWORD`     | string  | ✅       | SMTP password            |
| `SMTP_SECURE`       | boolean | ✅       | Use TLS/SSL (true/false) |
| `SMTP_FROM_NAME`    | string  | ✅       | Default from name        |
| `SMTP_FROM_ADDRESS` | email   | ✅       | Default from email       |

**Example**:

```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
SMTP_SECURE=false
SMTP_FROM_NAME=Your App Name
SMTP_FROM_ADDRESS=noreply@example.com
```

### 6.2.2. Client Variables

| Variable                    | Type | Required | Description             |
| --------------------------- | ---- | -------- | ----------------------- |
| `NEXT_PUBLIC_APP_URL`       | URL  | ✅       | Application base URL    |
| `NEXT_PUBLIC_API_URL`       | URL  | ✅       | API base URL            |
| `NEXT_PUBLIC_S3_PUBLIC_URL` | URL  | ✅       | Public S3 URL for media |

**Example**:

```
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_S3_PUBLIC_URL=https://your-bucket.r2.dev
```

### 6.2.3. Node Environment

| Variable   | Type | Required | Description                       |
| ---------- | ---- | -------- | --------------------------------- |
| `NODE_ENV` | enum | ✅       | development \| test \| production |

## 6.3. Database Adapter Configuration

**File**: `src/database/database.adapter.ts`

```typescript
postgresAdapter({
  pool: {
    connectionString: env.DATABASE_URL,
    ssl: env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined,
  },
  migrationDir: path.resolve(dirname, 'migrations'),
  prodMigrations: migrations,
  push: false, // Disable auto-push, use migrations
})
```

### Features

- **Connection Pooling**: Automatic connection management
- **SSL**: Enabled trong production
- **Migrations**: Custom migration system
- **Push**: Disabled (chỉ dùng migrations)

## 6.4. Storage Adapter Configuration

**File**: `src/config/adapters/storage.adapter.ts`

```typescript
s3Storage({
  collections: {
    media: {
      prefix: '', // No prefix for clean URLs
    },
  },
  bucket: env.S3_BUCKET_NAME,
  acl: 'private', // Private ACL (no public-read)
  config: {
    endpoint: env.S3_ENDPOINT,
    credentials: {
      accessKeyId: env.S3_ACCESS_KEY_ID,
      secretAccessKey: env.S3_SECRET_ACCESS_KEY,
    },
    region: env.S3_REGION,
    forcePathStyle: true, // For R2 and MinIO compatibility
  },
})
```

### Features

- **S3-Compatible**: Works với Cloudflare R2, AWS S3, MinIO
- **Private ACL**: Files không public-read
- **Path-Style URLs**: Compatible với R2 và MinIO
- **No Prefix**: Clean URLs

## 6.5. Email Adapter Configuration

**File**: `src/config/adapters/smtp.adapter.ts`

```typescript
nodemailerAdapter({
  defaultFromAddress: env.SMTP_FROM_ADDRESS,
  defaultFromName: env.SMTP_FROM_NAME,
  transportOptions: {
    host: env.SMTP_HOST,
    port: env.SMTP_PORT,
    secure: env.SMTP_SECURE,
    auth: {
      user: env.SMTP_USER,
      pass: env.SMTP_PASSWORD,
    },
  },
})
```

### Features

- **SMTP Protocol**: Standard SMTP support
- **TLS/SSL**: Configurable secure connection
- **Default From**: Set default sender info

## 6.6. Collection Configurations

### 6.6.1. Users Collection

**File**: `src/collections/users/config.ts`

- Authentication enabled
- Email verification required
- JWT expiration: Configurable (default 3 hours)
- Max login attempts: 5
- Lock time: 10 minutes
- Secure cookies trong production

### 6.6.2. Posts Collection

**File**: `src/collections/posts/config.ts`

- Draft/Version support enabled
- 3 post types: blog, podcast, resource
- Conditional fields based on type
- Relationships: categories, tags, related posts

### 6.6.3. Media Collection

**File**: `src/collections/media/config.ts`

- Upload enabled
- Image optimization: WebP format, 80% quality
- Multiple image sizes: adminThumbnail, thumbnail, card, featured
- BlurHash generation hook
- Supported types: images, videos, PDFs

## 6.7. Environment Validation

Environment variables được validate tại runtime:

```typescript
export const env = createEnv({
  server: { ... },
  client: { ... },
  runtimeEnv: { ... },
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  emptyStringAsUndefined: true,
})
```

### Validation Features

- **Type Safety**: TypeScript types từ Zod schemas
- **Runtime Validation**: Validate tại startup
- **Skip Option**: `SKIP_ENV_VALIDATION=true` để skip (CI/CD)
- **Empty String Handling**: Empty strings treated as undefined

## 6.8. Type Generation

Types được generate tự động:

```bash
pnpm generate:types
```

Output file: `src/payload-types.ts`

**Lưu ý**: Chạy lại sau mỗi lần thay đổi collection schema.

## 6.9. Import Maps

Import maps được generate cho admin panel:

```bash
pnpm generate:importmap
```

Base directory: `src/` (từ `payload.config.ts`)

## 6.10. Configuration Best Practices

1. **Secrets**: Không commit secrets vào git
2. **Environment Variables**: Validate tất cả tại startup
3. **Database**: Sử dụng migrations, không dùng push trong production
4. **Storage**: Private ACL cho security
5. **Email**: Sử dụng app passwords, không dùng main password
6. **CORS**: Chỉ whitelist trusted origins
7. **Types**: Generate types sau mỗi schema change
