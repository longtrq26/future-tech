# 5. API Specifications

## 5.1. REST API Overview

Payload CMS tự động tạo REST API endpoints cho tất cả collections. API được mount tại `/api/{collection-slug}`.

### Base URL

- **Development**: `http://localhost:3000/api`
- **Production**: `{NEXT_PUBLIC_API_URL}/api`

### Authentication

API sử dụng JWT-based authentication. Token được lưu trong HTTP-only cookie sau khi login.

## 5.2. Authentication Endpoints

### 5.2.1. Login

**Endpoint**: `POST /api/users/login`

**Request Body**:

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response** (200 OK):

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user-id",
    "email": "user@example.com",
    "name": "User Name",
    "role": "user"
  }
}
```

**Error Response** (401 Unauthorized):

```json
{
  "message": "Invalid credentials"
}
```

### 5.2.2. Logout

**Endpoint**: `POST /api/users/logout`

**Headers**: Cookie với JWT token

**Response** (200 OK):

```json
{
  "message": "Successfully logged out"
}
```

### 5.2.3. Refresh Token

**Endpoint**: `POST /api/users/refresh-token`

**Headers**: Cookie với JWT token

**Response** (200 OK):

```json
{
  "token": "new-jwt-token",
  "user": { ... }
}
```

### 5.2.4. Forgot Password

**Endpoint**: `POST /api/users/forgot-password`

**Request Body**:

```json
{
  "email": "user@example.com"
}
```

**Response** (200 OK):

```json
{
  "message": "If a matching account was found, an email was sent to reset the password."
}
```

### 5.2.5. Reset Password

**Endpoint**: `POST /api/users/reset-password`

**Request Body**:

```json
{
  "token": "reset-token-from-email",
  "password": "new-password"
}
```

**Response** (200 OK):

```json
{
  "token": "jwt-token",
  "user": { ... }
}
```

## 5.3. Collection Endpoints

### 5.3.1. Find Documents

**Endpoint**: `GET /api/{collection}`

**Query Parameters**:

- `where`: JSON query object
- `limit`: Number of documents (default: 10)
- `page`: Page number (default: 1)
- `sort`: Sort field (default: `-createdAt`)
- `depth`: Relationship depth (default: 0)

**Example**: `GET /api/posts?where[status][equals]=published&limit=10&depth=2`

**Response** (200 OK):

```json
{
  "docs": [
    {
      "id": "post-id",
      "title": "Post Title",
      "content": { ... },
      "category": {
        "id": "cat-id",
        "name": "Category Name"
      }
    }
  ],
  "totalDocs": 100,
  "limit": 10,
  "totalPages": 10,
  "page": 1,
  "pagingCounter": 1,
  "hasPrevPage": false,
  "hasNextPage": true,
  "prevPage": null,
  "nextPage": 2
}
```

### 5.3.2. Find By ID

**Endpoint**: `GET /api/{collection}/{id}`

**Query Parameters**:

- `depth`: Relationship depth

**Example**: `GET /api/posts/123?depth=2`

**Response** (200 OK):

```json
{
  "id": "post-id",
  "title": "Post Title",
  "content": { ... },
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

**Error Response** (404 Not Found):

```json
{
  "message": "The requested resource was not found."
}
```

### 5.3.3. Create Document

**Endpoint**: `POST /api/{collection}`

**Headers**:

- `Content-Type: application/json`
- Cookie với JWT token (nếu cần authentication)

**Request Body**:

```json
{
  "title": "New Post",
  "type": "blog",
  "content": { ... },
  "categories": ["cat-id-1", "cat-id-2"]
}
```

**Response** (201 Created):

```json
{
  "id": "new-post-id",
  "title": "New Post",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

**Error Response** (400 Bad Request):

```json
{
  "message": "The following field is invalid: title",
  "errors": [
    {
      "message": "This field is required.",
      "data": { ... }
    }
  ]
}
```

### 5.3.4. Update Document

**Endpoint**: `PATCH /api/{collection}/{id}`

**Headers**:

- `Content-Type: application/json`
- Cookie với JWT token

**Request Body**:

```json
{
  "title": "Updated Title"
}
```

**Response** (200 OK):

```json
{
  "id": "post-id",
  "title": "Updated Title",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

### 5.3.5. Delete Document

**Endpoint**: `DELETE /api/{collection}/{id}`

**Headers**: Cookie với JWT token

**Response** (200 OK):

```json
{
  "message": "Successfully deleted",
  "id": "deleted-id"
}
```

### 5.3.6. Count Documents

**Endpoint**: `GET /api/{collection}/count`

**Query Parameters**:

- `where`: JSON query object

**Example**: `GET /api/posts/count?where[status][equals]=published`

**Response** (200 OK):

```json
{
  "totalDocs": 100
}
```

## 5.4. Query Operators

### Comparison Operators

```typescript
{
  "where": {
    "field": {
      "equals": "value",
      "not_equals": "value",
      "in": ["value1", "value2"],
      "not_in": ["value1", "value2"],
      "exists": true
    }
  }
}
```

### Text Operators

```typescript
{
  "where": {
    "title": {
      "contains": "search term",
      "like": "pattern"
    }
  }
}
```

### Number Operators

```typescript
{
  "where": {
    "count": {
      "greater_than": 10,
      "greater_than_equal": 10,
      "less_than": 100,
      "less_than_equal": 100
    }
  }
}
```

### Date Operators

```typescript
{
  "where": {
    "publishedDate": {
      "greater_than": "2024-01-01",
      "less_than": "2024-12-31"
    }
  }
}
```

### Relationship Operators

```typescript
{
  "where": {
    "category": {
      "equals": "category-id",
      "in": ["id1", "id2"]
    }
  }
}
```

### Logical Operators

```typescript
{
  "where": {
    "or": [
      { "status": { "equals": "published" } },
      { "status": { "equals": "draft" } }
    ],
    "and": [
      { "type": { "equals": "blog" } },
      { "createdBy": { "equals": "user-id" } }
    ]
  }
}
```

## 5.5. Example Queries

### Get Published Posts

```bash
curl -X GET "http://localhost:3000/api/posts?where[_status][equals]=published&limit=10&depth=2"
```

### Get Posts by Category

```bash
curl -X GET "http://localhost:3000/api/posts?where[categories][equals]=category-id&limit=10"
```

### Get User's Posts

```bash
curl -X GET "http://localhost:3000/api/posts?where[createdBy][equals]=user-id" \
  -H "Cookie: payload-token=jwt-token"
```

### Search Posts

```bash
curl -X GET "http://localhost:3000/api/posts?where[title][contains]=search-term"
```

### Create Comment

```bash
curl -X POST "http://localhost:3000/api/comments" \
  -H "Content-Type: application/json" \
  -H "Cookie: payload-token=jwt-token" \
  -d '{
    "content": "Great post!",
    "post": "post-id"
  }'
```

### Like a Post

```bash
curl -X POST "http://localhost:3000/api/likes" \
  -H "Content-Type: application/json" \
  -H "Cookie: payload-token=jwt-token" \
  -d '{
    "post": "post-id"
  }'
```

### Unlike a Post

```bash
curl -X DELETE "http://localhost:3000/api/likes/like-id" \
  -H "Cookie: payload-token=jwt-token"
```

## 5.6. Error Responses

### 400 Bad Request

```json
{
  "message": "The following field is invalid: email",
  "errors": [
    {
      "message": "This field must be a valid email.",
      "data": { ... }
    }
  ]
}
```

### 401 Unauthorized

```json
{
  "message": "You are not authorized to access this resource."
}
```

### 403 Forbidden

```json
{
  "message": "You are not allowed to perform this action."
}
```

### 404 Not Found

```json
{
  "message": "The requested resource was not found."
}
```

### 429 Too Many Requests

```json
{
  "message": "Too many requests, please try again later."
}
```

### 500 Internal Server Error

```json
{
  "message": "An error occurred while processing your request."
}
```

## 5.7. Local API vs REST API

### Local API

Sử dụng trong server-side code (API routes, server components):

```typescript
import configPromise from '@payload-config'
import { getPayload } from 'payload'

const payload = await getPayload({ config: configPromise })

const posts = await payload.find({
  collection: 'posts',
  where: { _status: { equals: 'published' } },
  limit: 10,
  user: currentUser, // Optional: for access control
  overrideAccess: false, // Important: respect access control
})
```

**Lưu ý**: Local API mặc định bypass access control (`overrideAccess: true`). Luôn set `overrideAccess: false` khi làm việc với user data.

### REST API

Sử dụng từ client-side hoặc external services:

```typescript
const response = await fetch('/api/posts?where[_status][equals]=published&limit=10', {
  credentials: 'include', // Include cookies for authentication
})

const data = await response.json()
```

## 5.8. GraphQL API

GraphQL API đã được **disabled** trong configuration:

```typescript
graphQL: {
  disable: true,
}
```

Chỉ sử dụng REST API.

## 5.9. Rate Limiting

Payload CMS không có built-in rate limiting. Nên implement rate limiting ở:

- Next.js middleware level
- Reverse proxy (Nginx, Cloudflare)
- API gateway

## 5.10. CORS Configuration

CORS được cấu hình trong `payload.config.ts`:

```typescript
cors: [env.NEXT_PUBLIC_APP_URL, env.NEXT_PUBLIC_API_URL].filter((url): url is string => !!url)
```

Chỉ các origins được cấu hình mới có thể access API.
