# 8. Deployment & Operations

## 8.1. Environment Setup

### 8.1.1. Development Environment

#### Prerequisites

- **Node.js**: ^18.20.2 || >=20.9.0
- **Package Manager**: pnpm ^9 || ^10
- **PostgreSQL**: Running instance (local or remote)
- **S3 Storage**: S3-compatible service (Cloudflare R2, AWS S3, MinIO)

#### Setup Steps

1. **Clone Repository**

   ```bash
   git clone <repository-url>
   cd future-tech
   ```

2. **Install Dependencies**

   ```bash
   pnpm install
   ```

3. **Environment Variables**

   ```bash
   cp .env.example .env
   # Edit .env với các values phù hợp
   ```

4. **Database Setup**
   - Tạo PostgreSQL database
   - Update `DATABASE_URL` trong `.env`
   - Run migrations:
     ```bash
     pnpm migrate
     ```

5. **Start Development Server**

   ```bash
   pnpm dev
   ```

6. **Create Admin User**
   - Mở `http://localhost:3000/admin`
   - Follow on-screen instructions để tạo admin user

### 8.1.2. Production Environment

#### Environment Variables Checklist

**Database**:

- [ ] `DATABASE_URL`: Production PostgreSQL connection string
- [ ] SSL connection enabled

**Security**:

- [ ] `PAYLOAD_SECRET`: Strong random secret (min 32 chars)
- [ ] `PAYLOAD_JWT_EXPIRATION`: Appropriate expiration time

**Storage**:

- [ ] `S3_ENDPOINT`: Production S3 endpoint
- [ ] `S3_ACCESS_KEY_ID`: Production access key
- [ ] `S3_SECRET_ACCESS_KEY`: Production secret key
- [ ] `S3_BUCKET_NAME`: Production bucket name
- [ ] `S3_REGION`: Production region
- [ ] `NEXT_PUBLIC_S3_PUBLIC_URL`: Public CDN URL (if using)

**Email**:

- [ ] `SMTP_HOST`: Production SMTP server
- [ ] `SMTP_PORT`: Production SMTP port
- [ ] `SMTP_USER`: Production SMTP user
- [ ] `SMTP_PASSWORD`: Production SMTP password
- [ ] `SMTP_SECURE`: true (for production)
- [ ] `SMTP_FROM_NAME`: Production from name
- [ ] `SMTP_FROM_ADDRESS`: Production from address

**URLs**:

- [ ] `NEXT_PUBLIC_APP_URL`: Production app URL
- [ ] `NEXT_PUBLIC_API_URL`: Production API URL

**Environment**:

- [ ] `NODE_ENV`: production

## 8.2. Database Migrations

### 8.2.1. Migration System

Payload CMS sử dụng custom migration system trong `src/database/migrations/`.

**Migration Files**:

- `20260123_203533_create_users_and_media_collections.ts`
- `20260123_205141_create_core_content_collections.ts`

### 8.2.2. Running Migrations

#### Check Migration Status

```bash
pnpm migrate:status
```

#### Run Migrations

```bash
pnpm migrate
```

#### Create New Migration

```bash
pnpm migrate:create
```

**Lưu ý**:

- Migrations chạy tự động trong development
- Trong production, phải chạy migrations manually trước khi deploy
- Không dùng `push: true` trong production

### 8.2.3. Migration Best Practices

1. ✅ Always test migrations trong development trước
2. ✅ Backup database trước khi chạy migrations trong production
3. ✅ Run migrations trong maintenance window
4. ✅ Monitor migration execution
5. ✅ Rollback plan ready

## 8.3. Type Generation

### 8.3.1. Generate Types

Sau mỗi lần thay đổi collection schema:

```bash
pnpm generate:types
```

**Output**: `src/payload-types.ts`

### 8.3.2. Import Maps

Generate import maps cho admin panel:

```bash
pnpm generate:importmap
```

**Lưu ý**: Chạy sau khi tạo mới hoặc modify custom components.

## 8.4. Build Process

### 8.4.1. Build Application

```bash
pnpm build
```

**Output**: `.next/` directory với production build

### 8.4.2. Start Production Server

```bash
pnpm start
```

**Port**: Default 3000 (hoặc PORT environment variable)

### 8.4.3. Build Configuration

**File**: `next.config.mjs`

- Optimized production build
- Image optimization enabled
- Static file serving
- API routes enabled

## 8.5. Deployment Platforms

### 8.5.1. Vercel

**Recommended**: Best cho Next.js applications

**Steps**:

1. Connect repository to Vercel
2. Configure environment variables
3. Set build command: `pnpm build`
4. Set output directory: `.next`
5. Deploy

**Environment Variables**: Set trong Vercel dashboard

**Database**: External PostgreSQL (Vercel Postgres, Supabase, etc.)

**Storage**: External S3 (Cloudflare R2, AWS S3)

### 8.5.2. Docker

**Dockerfile**: Provided trong project root

**Build Image**:

```bash
docker build -t future-tech .
```

**Run Container**:

```bash
docker run -p 3000:3000 --env-file .env future-tech
```

**Docker Compose**: Có thể dùng cho local development với PostgreSQL

### 8.5.3. Self-Hosted

**Requirements**:

- Node.js runtime
- PostgreSQL database
- Reverse proxy (Nginx, Caddy)
- Process manager (PM2, systemd)

**Steps**:

1. Build application: `pnpm build`
2. Run migrations: `pnpm migrate`
3. Start server: `pnpm start`
4. Configure reverse proxy
5. Setup SSL certificates (Let's Encrypt)

## 8.6. Production Checklist

### 8.6.1. Pre-Deployment

- [ ] All environment variables configured
- [ ] Database migrations tested và ready
- [ ] Types generated: `pnpm generate:types`
- [ ] Import maps generated: `pnpm generate:importmap`
- [ ] Build successful: `pnpm build`
- [ ] Tests passing: `pnpm test`
- [ ] Security audit completed

### 8.6.2. Database

- [ ] Production database created
- [ ] Connection string configured
- [ ] SSL enabled
- [ ] Backup strategy in place
- [ ] Migrations ready to run

### 8.6.3. Storage

- [ ] S3 bucket created
- [ ] Access keys configured
- [ ] Bucket policies set
- [ ] CDN configured (optional)
- [ ] Public URL configured

### 8.6.4. Email

- [ ] SMTP server configured
- [ ] Test email sent successfully
- [ ] From address verified
- [ ] SPF/DKIM records set (if custom domain)

### 8.6.5. Security

- [ ] Strong `PAYLOAD_SECRET` generated
- [ ] HTTPS enabled
- [ ] CORS configured correctly
- [ ] CSRF protection enabled
- [ ] Secure cookies enabled
- [ ] Rate limiting configured
- [ ] Security headers set

### 8.6.6. Monitoring

- [ ] Error tracking setup (Sentry, etc.)
- [ ] Logging configured
- [ ] Uptime monitoring
- [ ] Performance monitoring
- [ ] Alerting configured

## 8.7. Maintenance

### 8.7.1. Regular Tasks

**Daily**:

- Monitor error logs
- Check system health

**Weekly**:

- Review access logs
- Check storage usage
- Review performance metrics

**Monthly**:

- Security updates
- Dependency updates
- Database optimization
- Backup verification

### 8.7.2. Updates

**Dependencies**:

```bash
pnpm update
pnpm test # Test after updates
```

**Payload CMS**:

- Check [Payload CMS releases](https://github.com/payloadcms/payload/releases)
- Review breaking changes
- Test trong development trước
- Update migration nếu cần

### 8.7.3. Backup Strategy

**Database**:

- Automated daily backups
- Retention: 30 days minimum
- Test restore procedure regularly

**Storage**:

- S3 versioning enabled (optional)
- Cross-region replication (optional)
- Regular backup verification

## 8.8. Troubleshooting

### 8.8.1. Common Issues

#### Database Connection Errors

**Symptoms**: Cannot connect to database

**Solutions**:

- Verify `DATABASE_URL` is correct
- Check database is running
- Verify network connectivity
- Check SSL configuration

#### Migration Errors

**Symptoms**: Migrations fail

**Solutions**:

- Check migration files are correct
- Verify database permissions
- Review migration logs
- Rollback if needed

#### Storage Upload Errors

**Symptoms**: File uploads fail

**Solutions**:

- Verify S3 credentials
- Check bucket permissions
- Verify endpoint URL
- Check file size limits

#### Authentication Issues

**Symptoms**: Cannot login

**Solutions**:

- Verify `PAYLOAD_SECRET` is set
- Check JWT expiration
- Verify email verification status
- Check login attempt limits

### 8.8.2. Debug Mode

Enable debug logging:

```bash
DEBUG=payload:* pnpm dev
```

### 8.8.3. Logs

**Development**: Console logs

**Production**:

- Application logs
- Error tracking (Sentry, etc.)
- Server logs (Vercel, etc.)

## 8.9. Performance Optimization

### 8.9.1. Database

- Indexes on frequently queried fields
- Connection pooling
- Query optimization
- Regular VACUUM (PostgreSQL)

### 8.9.2. Storage

- CDN for media files
- Image optimization (already enabled)
- Lazy loading
- BlurHash for progressive loading

### 8.9.3. API

- Response caching
- Pagination
- Field selection (`select` parameter)
- Depth limiting (`depth` parameter)

### 8.9.4. Next.js

- Static generation where possible
- Image optimization
- Code splitting
- Bundle optimization

## 8.10. Scaling

### 8.10.1. Horizontal Scaling

- Stateless application: Easy to scale
- Database: Connection pooling
- Storage: S3 (already scalable)
- Load balancer: Required for multiple instances

### 8.10.2. Vertical Scaling

- Increase server resources
- Database optimization
- Caching layer (Redis, etc.)

### 8.10.3. Database Scaling

- Read replicas
- Connection pooling
- Query optimization
- Consider managed database (Vercel Postgres, Supabase, etc.)
