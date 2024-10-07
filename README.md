# Performance Tracker starter

Performance Tracker allows to visualize and manage data from athletes in an easy way. 

It includes everything you need, including:

- [Ionic/React](https://ionicframework.com/docs/react) for the frontend
- [Hono](https://hono.dev/) as lightweight backend
- [Prisma](https://www.prisma.io/) as ORM
- [PostgreSQL](https://www.postgresql.org/) as database
- [Docker](https://www.docker.com/)  for containerization, with docker-compose
- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [Turborepo](https://turbo.build) as build system for monorepos 
- And some more nice-to-have features such as prettier, eslint, etc.


## Using this template

Clone the repository:

```sh
git clone https://github.com/m-polo/performance-tracker.git
```

Rename `packages/database/.env.example` to `packages/database/.env`
Rename `apps/api/.env.example` to `apps/api/.env`
Rename `apps/web/.env.example` to `apps/web/.env`

Start everything with docker-compose:

```sh
docker-compose watch
```

## What's inside?

It includes the following packages/apps:

### Apps and Packages

- Apps
    - `web`: a [Ionic/React](https://ionicframework.com/docs/react) app
    - `api`: a [Hono](https://hono.dev/) app

- Packages
    - `@pertrack/database`: a Prisma library used by `api` app
    - `@pertrack/eslint-config`: `eslint` configurations
    - `@pertrack/typescript-config`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

It has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Build

To build all apps and packages, run the following command:

```
npm run build
```

### Develop

To start in development all apps and packages, run the following command:

```
npm run dev
```

### Test

To test all apps and packages, run the following command:

```
npm run test
```

### Start

To start all apps and packages, run the following command:

```
npm run start
```