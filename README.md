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

3. If database is empty, perform seeding:
```bash
npx prisma db seed
```

4. Build and start the application using Docker:
```bash
docker compose up -d --build
```

The service will be available at `localhost:3000`. Please ensure that the SOAP service at `localhost:8888` is also running as this service depends on it.

## Database Scheme

![Database ERD](docs/screenshots/erd.jpg)

## API Endpoints

| Method | Endpoint                  | Description                                                        |
|--------|---------------------------|--------------------------------------------------------------------|
| DELETE | /album/:id                | Remove a specific album                                            |
| DELETE | /poem/:id                 | Remove a specific poem                                             |
| GET    | /album/:id                | Obtain details of a specific album                                 |
| GET    | /album/creator            | Retrieve all albums of the currently logged in creator             |
| GET    | /album/creator/:creatorId | Fetch all albums from a specific creator                           |
| GET    | /poem                     | Fetch all poems available                                          |
| GET    | /poem/:id                 | Obtain details of a specific poem                                  |
| GET    | /poem/album/:albumId      | Retrieve all poems in a specific album                             |
| GET    | /user                     | Retrieve the profile of the currently logged in creator            |
| GET    | /user/creator/:creatorId  | Retrieve the profile of a specific creator                         |
| GET    | /user/creators            | Fetch list of all registered creators                              |
| PATCH  | /album/:id                | Update the details of a specific album                             |
| PATCH  | /user                     | Update the profile information of the currently logged in creator  |
| POST   | /album                    | Create a new album                                                 |
| POST   | /auth/login               | Authenticate and log in a creator                                  |
| POST   | /auth/register            | Register a new creator account                                     |
| POST   | /file/audio               | Upload an audio file                                               |
| POST   | /file/img                 | Upload an image file                                               |
| POST   | /poem                     | Create a new poem                                                  |
| PUT    | /poem/:id                 | Update the details of a specific poem                              |

## Task Division

| Task                      | Contributor  |
|---------------------------|--------------|
| Album                     | 13521046     |
| Auth                      | 13521046     |
| Docker and Infrastructure | 13521046     |
| File                      | 13521046     |
| Poem                      | 13521103     |
| Redis                     | 13521046     |
| User                      | 13521046     |


## Authors
| NIM      | Nama                    |
|----------|-------------------------|
| 10023334 | Tubagus Rahardi         |
| 13521046 | Jeffrey Chow            |
| 13521103 | Aulia Mey Diva Annandya |
