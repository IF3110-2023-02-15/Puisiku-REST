FROM node:16.13

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./
COPY prisma ./prisma/

# Install application's dependencies
RUN npm install

# Generate Prisma client
RUN npx prisma generate

COPY src ./src
COPY public/ ./public

EXPOSE 3000

CMD [ "npm", "run", "start" ]
