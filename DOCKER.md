# Raja Cepat - Docker Setup

## Prerequisites
- Docker 20.10+
- Docker Compose v2+
- Node.js 22+ (for local development)

## Tech Stack
- **Next.js 16** with App Router
- **Node.js 22 Alpine** for optimized image size
- **Multi-stage build** for production optimization

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

## Health Check

Container dilengkapi dengan health check untuk monitoring:
- Interval: 30 detik
- Timeout: 10 detik
- Retries: 3 kali
- Start period: 40 detik

Check health status:
```bash
docker inspect --format='{{.State.Health.Status}}' raja-cepat-app
```

## Production Deployment

Untuk production, pastikan:
1. Set `NODE_ENV=production`
2. Gunakan SSL/HTTPS (reverse proxy dengan Nginx/Caddy)
3. Set proper API endpoints
4. Configure proper logging
5. Set resource limits di docker-compose.yml:
   ```yaml
   deploy:
     resources:
       limits:
         cpus: '1'
         memory: 1G
       reservations:
         cpus: '0.5'
         memory: 512M
   ```

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

### Check health status
```bash
docker inspect raja-cepat-app | grep -A 10 Health
```

## Docker Image Optimization

Image menggunakan **multi-stage build** dengan 3 tahap:
1. **deps** - Install dependencies
2. **builder** - Build aplikasi Next.js
3. **runner** - Runtime image yang minimal

Hasil:
- Image size: ~150-200MB (Alpine-based)
- Non-root user untuk security
- Standalone output untuk optimal performance

## Structure

```
.
├── Dockerfile              # Multi-stage Docker build (Node.js 22)
├── docker-compose.yml      # Docker Compose dengan health check
├── .dockerignore          # Files to exclude dari Docker build
└── next.config.ts         # Next.js 16 config (standalone output)
```

## Akses Aplikasi

Setelah container berjalan, akses aplikasi di:
- http://localhost:3000
