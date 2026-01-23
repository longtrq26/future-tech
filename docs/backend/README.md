# Payload CMS Backend - Mini SDS

Tài liệu thiết kế phần mềm (Software Design Specification) cho hệ thống backend Payload CMS.

## Mục lục

1. [Tổng quan hệ thống](./01-overview.md)
2. [Kiến trúc hệ thống](./02-architecture.md)
3. [Components và Modules](./03-components.md)
4. [Data Models](./04-data-models.md)
5. [API Specifications](./05-apis.md)
6. [Configuration](./06-configuration.md)
7. [Security & Access Control](./07-security.md)
8. [Deployment & Operations](./08-deployment.md)

## Quick Start

### Tech Stack

- **Framework**: Payload CMS 3.72.0
- **Runtime**: Next.js 15.4.10
- **Database**: PostgreSQL (via @payloadcms/db-postgres)
- **Storage**: S3-compatible (Cloudflare R2)
- **Email**: SMTP (via @payloadcms/email-nodemailer)
- **Editor**: Lexical Rich Text Editor
- **Image Processing**: Sharp

### Cấu trúc thư mục chính

```
src/
├── payload.config.ts          # Main Payload configuration
├── collections/                # Collection definitions
│   ├── users/
│   ├── posts/
│   ├── categories/
│   ├── tags/
│   ├── comments/
│   ├── likes/
│   └── media/
├── access/                     # Access control functions
├── config/                     # Configuration adapters
│   ├── adapters/
│   └── env/
├── database/                   # Database adapter & migrations
└── utils/                      # Utility functions
```

### Collections Overview

| Collection     | Mô tả                                  | Access Control                    |
| -------------- | -------------------------------------- | --------------------------------- |
| **Users**      | Authentication, user management, roles | RBAC (admin/writer/user)          |
| **Posts**      | Blog posts, podcasts, resources        | Draft/Published workflow          |
| **Categories** | Taxonomy cho posts                     | Admin/Writer only                 |
| **Tags**       | Tagging system                         | Admin/Writer only                 |
| **Comments**   | Comment system                         | Public read, authenticated create |
| **Likes**      | Like system                            | Authenticated users               |
| **Media**      | File uploads (images, videos, PDFs)    | S3 storage, image processing      |

### Key Features

- ✅ Role-based access control (RBAC)
- ✅ Draft/Published workflow cho Posts
- ✅ Multi-language support (en, vi)
- ✅ Image optimization với Sharp
- ✅ BlurHash generation cho images
- ✅ S3-compatible storage
- ✅ Email verification
- ✅ Database migrations

## Tài liệu liên quan

- [Payload CMS Official Docs](https://payloadcms.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

## Liên hệ

Để biết thêm chi tiết, vui lòng tham khảo các phần tài liệu tương ứng trong mục lục.
