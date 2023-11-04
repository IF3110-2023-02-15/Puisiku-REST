## How to Run

Make sure prisma/migrations available. If no, docker compose up first, then run init migration. after that, docker compose down, and up again.

Init migration to db first
`npx prisma migrate dev --name init`

`docker compose up -d --build`
Server will be hosted on `localhost:3000`
