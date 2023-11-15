# Puisiku Rest Service

The Puisiku Rest Service is a robust backend service that provides RESTful APIs for user management, album creation, poem publishing, and file handling. It is built using Express.js with TypeScript, Prisma ORM, Redis, and PostgreSQL. This service is utilized by both the Puisiku app (PHP) and the Puisiku Premium app (React SPA).

## Getting Started

Follow the steps below to set up and run the Puisiku Rest Service:

1. Copy the contents of the `env.example` file to a new file named `.env`.

```bash
DATABASE_URL=postgresql://puisiku-rest:puisiku-rest@localhost:5434/puisiku-rest-db

PSQL_HOST=puisiku-rest-db
PSQL_PORT=5432
PSQL_NAME=puisiku-rest-db
PSQL_USER=puisiku-rest
PSQL_PASSWORD=puisiku-rest

REST_PORT=3000

JWT_SECRET_KEY=asdfghjkl
JWT_EXPIRE_TIME=1h

CLIENT_SPA_BASE_URL=http://localhost:5173
SOAP_BASE_URL=http://puisiku-soap-service:8888
PHP_BASE_URL=http://localhost:5001

API_KEY=restnibos

SOAP_API_KEY=fromrest
```

2. If the database migration does not exist, perform the migration first:
```bash
npx prisma migrate dev --name init
```

3. Build and start the application using Docker:
```bash
docker compose up -d --build
```

The service will be available at `localhost:3000`. Please ensure that the SOAP service at `localhost:8888` is also running as this service depends on it.

## Database Scheme

## API Endpoint

## Task Division
