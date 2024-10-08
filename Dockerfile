FROM node:20-alpine

WORKDIR /app
RUN npm install turbo --global
COPY . .
RUN npm install

COPY ./packages/database/.env.example /app/packages/database/.env

CMD npm run db:migrate:deploy && npm run db:seed