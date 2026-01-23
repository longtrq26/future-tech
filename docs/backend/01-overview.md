# 1. Tổng quan hệ thống

## 1.1. Mục đích và phạm vi

Hệ thống Payload CMS Backend cung cấp một Content Management System (CMS) hoàn chỉnh với các tính năng:

- Quản lý nội dung (Posts, Categories, Tags)
- Quản lý người dùng với phân quyền
- Hệ thống comment và like
- Upload và quản lý media files
- API RESTful cho frontend
- Admin panel tích hợp

## 1.2. Tech Stack

### Core Dependencies

```json
{
  "payload": "3.72.0",
  "next": "15.4.10",
  "react": "19.2.1",
  "@payloadcms/db-postgres": "3.72.0",
  "@payloadcms/richtext-lexical": "3.72.0",
  "@payloadcms/storage-s3": "^3.72.0",
  "@payloadcms/email-nodemailer": "^3.72.0"
}
```

### Development Dependencies

- **TypeScript** 5.7.3
- **Sharp** 0.34.2 (image processing)
- **Plaiceholder** 3.0.0 (BlurHash generation)
- **Zod** 4.3.6 (environment validation)
- **Vitest** 3.2.3 (testing)
- **Playwright** 1.56.1 (E2E testing)

## 1.3. Cấu trúc thư mục

```
src/
├── app/
│   ├── (frontend)/              # Frontend routes
│   └── (payload)/               # Payload admin routes
│       ├── admin/               # Admin panel
│       └── api/                 # API routes
│           ├── [...slug]/       # REST API handler
│           └── graphql/         # GraphQL endpoint (disabled)
│
├── collections/                 # Collection definitions
│   ├── users/
│   │   └── config.ts
│   ├── posts/
│   │   └── config.ts
│   ├── categories/
│   │   └── config.ts
│   ├── tags/
│   │   └── config.ts
│   ├── comments/
│   │   └── config.ts
│   ├── likes/
│   │   └── config.ts
│   └── media/
│       └── config.ts
│
├── access/                      # Access control
│   ├── index.ts                 # Access functions
│   └── roles.ts                 # Role definitions
│
├── config/                      # Configuration
│   ├── adapters/
│   │   ├── smtp.adapter.ts      # Email adapter
│   │   └── storage.adapter.ts   # S3 storage adapter
│   └── env/
│       └── index.ts             # Environment validation
│
├── database/                    # Database
│   ├── database.adapter.ts     # PostgreSQL adapter
│   └── migrations/              # Database migrations
│
├── utils/                       # Utilities
│   └── generate-blur-hash-url.ts
│
├── payload.config.ts           # Main Payload config
└── payload-types.ts            # Generated types
```

## 1.4. Collections Overview

### Users Collection

- Authentication với email/password
- Role-based access (admin, writer, user)
- Email verification
- JWT token expiration: 3 hours (configurable)
- Max login attempts: 5
- Lock time: 10 minutes

### Posts Collection

- 3 types: Blog Post, Podcast, Resource
- Draft/Published workflow
- Versioning support
- Relationships: Categories, Tags, Related Posts
- Conditional fields based on post type

### Categories Collection

- Taxonomy cho posts
- Unique name constraint
- Indexed for performance

### Tags Collection

- Tagging system
- Unique name constraint
- Many-to-many với Posts

### Comments Collection

- Public read access
- Authenticated create
- Owner/Admin update/delete
- Relationship với Posts và Users

### Likes Collection

- Binary like system (create/delete only)
- Unique constraint: (post, user)
- Relationship với Posts và Users

### Media Collection

- Upload support: images, videos, PDFs
- Image optimization (WebP format)
- Multiple image sizes: adminThumbnail, thumbnail, card, featured
- BlurHash generation cho images
- S3-compatible storage

## 1.5. Key Features

### Security

- CORS và CSRF protection
- JWT-based authentication
- Role-based access control (RBAC)
- Field-level access control
- Secure cookie settings

### Localization

- Multi-language support: English (en), Vietnamese (vi)
- Default locale: English
- Fallback enabled

### Image Processing

- Automatic WebP conversion
- Multiple image sizes generation
- BlurHash for progressive image loading
- Sharp integration

### Storage

- S3-compatible storage (Cloudflare R2)
- Private ACL
- Path-style URLs

### Email

- SMTP configuration
- Email verification
- Nodemailer adapter

## 1.6. Environment Requirements

- **Node.js**: ^18.20.2 || >=20.9.0
- **Package Manager**: pnpm ^9 || ^10
- **Database**: PostgreSQL
- **Storage**: S3-compatible service (Cloudflare R2, AWS S3, MinIO)

## 1.7. Development Workflow

1. **Setup**: Clone repo, install dependencies, configure `.env`
2. **Development**: Run `pnpm dev` để start dev server
3. **Type Generation**: Run `pnpm generate:types` sau khi thay đổi schema
4. **Migrations**: Run `pnpm migrate` để apply database migrations
5. **Testing**: Run `pnpm test` cho unit và E2E tests

Xem thêm chi tiết trong [08-deployment.md](./08-deployment.md).
