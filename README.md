## Prerun

set the env

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

## How to Run

Make sure prisma/migrations available. If no, docker compose up first, then run init migration. after that, docker compose down, and up again.

Init migration to db first
`npx prisma migrate dev --name init`

`docker compose up -d --build`
Server will be hosted on `localhost:3000`
