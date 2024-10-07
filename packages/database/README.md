## Getting started

- Install dependencies

```
npm install
```

- Rename `.env.example` to `.env`

Modify prisma/schema.prisma file if it is needed

- Generate client

```
npm run generate
```

- Start database

- Apply migrations and seed database:

```
npm run db:migrate:dev
npm run db:seed
```

## Useful scripts

- `build`: Build the application
- `lint`: Use linter
- `db:migrate:deploy`: Apply migrations to database in production
- `db:migrate:dev`: Apply migrations to database in development
- `db:migrate:reset`: Reset database
- `db:seed`: Apply database initial data
- `generate`: Generate prisma client

## Environment variables

- `DATABASE_URL`: Database URL to connect Prisma.

## Dependencies

- /package/eslint-config
- /package/typescript-config