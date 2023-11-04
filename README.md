## Prerun

set the env

```bash
DATABASE_URL=postgresql://chagiya-rest:chagiya-rest@localhost:5433/chagiya-rest-db

PSQL_HOST=chagiya-rest-db
PSQL_PORT=5432
PSQL_NAME=chagiya-rest-db
PSQL_USER=chagiya-rest
PSQL_PASSWORD=chagiya-rest

REST_PORT=3000

JWT_SECRET_KEY=asdfghjkl
JWT_EXPIRE_TIME=1h

CLIENT_SPA_BASE_URL=http://localhost:5173
```

## How to Run

Make sure prisma/migrations available. If no, docker compose up first, then run init migration. after that, docker compose down, and up again.

Init migration to db first
`npx prisma migrate dev --name init`

`docker compose up -d --build`
Server will be hosted on `localhost:3000`
