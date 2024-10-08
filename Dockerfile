FROM node:20-alpine

WORKDIR /app
RUN npm install turbo --global
COPY . .
RUN npm install

COPY .env.example /app/.env

CMD npm run db:migrate:deploy && npm run db:seed