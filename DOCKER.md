# Raja Cepat - Docker Setup

## Prerequisites
- Docker
- Docker Compose

## Quick Start

### 1. Build dan Run dengan Docker Compose
```bash
docker-compose up -d
```

### 2. Build Docker Image Manual
```bash
docker build -t raja-cepat .
```

### 3. Run Docker Container Manual
```bash
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_API_BASE_URL=https://apirace.eurekagroup.id \
  raja-cepat
```

## Konfigurasi

### Environment Variables
Anda dapat mengatur environment variables di `docker-compose.yml` atau saat menjalankan container:

- `NEXT_PUBLIC_API_BASE_URL` - Base URL untuk API tracking (default: https://apirace.eurekagroup.id)
- `NODE_ENV` - Environment mode (production/development)

### Port
Default port aplikasi adalah **3000**. Anda dapat mengubahnya di `docker-compose.yml`:

```yaml
ports:
  - "8080:3000"  # Akses via localhost:8080
```

## Commands

### Stop Container
```bash
docker-compose down
```

### View Logs
```bash
docker-compose logs -f raja-cepat
```

### Rebuild Image
```bash
docker-compose up -d --build
```

### Remove All (Container + Image + Volume)
```bash
docker-compose down -v --rmi all
```

## Production Deployment

Untuk production, pastikan:
1. Set `NODE_ENV=production`
2. Gunakan SSL/HTTPS
3. Set proper API endpoints
4. Configure proper logging
5. Set resource limits di docker-compose.yml jika diperlukan

## Troubleshooting

### Container tidak bisa start
```bash
docker-compose logs raja-cepat
```

### Rebuild dari scratch
```bash
docker-compose down
docker system prune -a
docker-compose up -d --build
```

### Check container status
```bash
docker ps
docker-compose ps
```

## Structure

```
.
├── Dockerfile              # Multi-stage Docker build
├── docker-compose.yml      # Docker Compose configuration
├── .dockerignore          # Files to exclude from Docker build
└── next.config.ts         # Next.js config (dengan output: standalone)
```

## Akses Aplikasi

Setelah container berjalan, akses aplikasi di:
- http://localhost:3000
