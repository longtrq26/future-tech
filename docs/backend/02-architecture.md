# 2. Kiến trúc hệ thống

## 2.1. System Architecture

```mermaid
graph TB
    subgraph Client["Client Layer"]
        Browser[Web Browser]
        AdminPanel[Admin Panel]
        Frontend[Frontend App]
    end

    subgraph NextJS["Next.js Application"]
        API[API Routes]
        Admin[Admin Routes]
        Pages[Frontend Pages]
    end

    subgraph Payload["Payload CMS Core"]
        Config[payload.config.ts]
        Collections[Collections]
        Access[Access Control]
        Hooks[Hooks System]
    end

    subgraph Adapters["Adapters"]
        DB[(PostgreSQL)]
        Storage[S3 Storage]
        Email[SMTP Email]
    end

    subgraph Utils["Utilities"]
        Sharp[Image Processing]
        BlurHash[BlurHash Generator]
    end

    Browser --> AdminPanel
    Browser --> Frontend
    AdminPanel --> Admin
    Frontend --> API
    Admin --> Payload
    API --> Payload
    Pages --> Payload

    Payload --> Config
    Config --> Collections
    Collections --> Access
    Collections --> Hooks

    Payload --> DB
    Payload --> Storage
    Payload --> Email

    Collections --> Sharp
    Collections --> BlurHash
```

## 2.2. Request Flow

### 2.2.1. API Request Flow

```mermaid
sequenceDiagram
    participant Client
    participant NextJS as Next.js API Route
    participant Payload as Payload CMS
    participant Access as Access Control
    participant DB as PostgreSQL
    participant Storage as S3 Storage

    Client->>NextJS: HTTP Request
    NextJS->>Payload: Route Handler
    Payload->>Access: Check Permissions
    Access-->>Payload: Access Granted/Denied

    alt Access Granted
        Payload->>DB: Query Database
        DB-->>Payload: Data
        alt Media Request
            Payload->>Storage: Get File
            Storage-->>Payload: File URL
        end
        Payload-->>NextJS: Response Data
        NextJS-->>Client: JSON Response
    else Access Denied
        Payload-->>NextJS: 401/403 Error
        NextJS-->>Client: Error Response
    end
```

### 2.2.2. Authentication Flow

```mermaid
sequenceDiagram
    participant User
    participant Admin as Admin Panel
    participant Payload as Payload CMS
    participant DB as PostgreSQL

    User->>Admin: Login Request
    Admin->>Payload: POST /api/users/login
    Payload->>DB: Verify Credentials
    DB-->>Payload: User Data
    Payload->>Payload: Generate JWT
    Payload-->>Admin: JWT Token + User
    Admin->>Admin: Store Token (Cookie)
    Admin-->>User: Redirect to Dashboard
```

## 2.3. Component Relationships

```mermaid
graph LR
    subgraph Collections["Collections"]
        Users[Users]
        Posts[Posts]
        Categories[Categories]
        Tags[Tags]
        Comments[Comments]
        Likes[Likes]
        Media[Media]
    end

    subgraph Access["Access Control"]
        Roles[Roles System]
        Functions[Access Functions]
    end

    subgraph Adapters["Adapters"]
        DBAdapter[Database Adapter]
        StorageAdapter[Storage Adapter]
        EmailAdapter[Email Adapter]
    end

    Users --> Roles
    Posts --> Roles
    Comments --> Roles
    Likes --> Roles
    Media --> Roles

    Users --> Functions
    Posts --> Functions
    Comments --> Functions
    Likes --> Functions
    Media --> Functions

    Posts --> Categories
    Posts --> Tags
    Posts --> Media
    Comments --> Posts
    Comments --> Users
    Likes --> Posts
    Likes --> Users
    Users --> Media

    DBAdapter --> Users
    DBAdapter --> Posts
    StorageAdapter --> Media
    EmailAdapter --> Users
```

## 2.4. Data Flow

### 2.4.1. Post Creation Flow

```mermaid
flowchart TD
    Start[Writer creates Post] --> Validate{Validate Fields}
    Validate -->|Invalid| Error[Return Validation Error]
    Validate -->|Valid| Access{Check Access}
    Access -->|Denied| Forbidden[Return 403]
    Access -->|Granted| Create[Create Document]
    Create --> Hook[Run beforeChange Hook]
    Hook --> Save[Save to Database]
    Save --> Version[Create Version]
    Version --> Success[Return Created Post]
```

### 2.4.2. Media Upload Flow

```mermaid
flowchart TD
    Start[Upload File] --> Validate{Validate MIME Type}
    Validate -->|Invalid| Error[Return Error]
    Validate -->|Valid| Process{Is Image?}
    Process -->|Yes| Resize[Generate Image Sizes]
    Process -->|No| Upload[Upload to S3]
    Resize --> BlurHash[Generate BlurHash]
    BlurHash --> Upload
    Upload --> Save[Save Metadata to DB]
    Save --> Success[Return Media Document]
```

## 2.5. Integration Points

### 2.5.1. Database Integration

- **Adapter**: `@payloadcms/db-postgres`
- **Connection**: PostgreSQL connection pool
- **Migrations**: Custom migration system trong `src/database/migrations/`
- **SSL**: Enabled trong production

### 2.5.2. Storage Integration

- **Adapter**: `@payloadcms/storage-s3`
- **Provider**: S3-compatible (Cloudflare R2)
- **Configuration**: Private ACL, path-style URLs
- **Collections**: Media collection only

### 2.5.3. Email Integration

- **Adapter**: `@payloadcms/email-nodemailer`
- **Protocol**: SMTP
- **Use Cases**: Email verification, password reset
- **Configuration**: Host, port, credentials từ environment

## 2.6. Security Architecture

```mermaid
graph TB
    subgraph Security["Security Layers"]
        CORS[CORS Protection]
        CSRF[CSRF Protection]
        JWT[JWT Authentication]
        RBAC[Role-Based Access]
        FieldAccess[Field-Level Access]
    end

    Request[Incoming Request] --> CORS
    CORS --> CSRF
    CSRF --> JWT
    JWT --> RBAC
    RBAC --> FieldAccess
    FieldAccess --> Response[Authorized Response]
```

## 2.7. Localization Architecture

- **Locales**: English (en), Vietnamese (vi)
- **Default**: English
- **Fallback**: Enabled
- **Fields**: Có thể mark fields là `localized: true`
- **Example**: User bio field hỗ trợ localization

## 2.8. Performance Considerations

### 2.8.1. Database

- Indexes trên các fields thường query (name, email, slug)
- Unique constraints để đảm bảo data integrity
- Connection pooling

### 2.8.2. Image Processing

- Lazy generation của image sizes
- WebP format cho smaller file sizes
- BlurHash cho progressive loading
- Sharp library cho efficient processing

### 2.8.3. Caching

- JWT tokens với expiration
- Static file serving từ S3/CDN
- Next.js built-in caching
