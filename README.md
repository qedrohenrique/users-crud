# Users Crud

This is a full microsservice application for managing users.
The purpouse of this project is to implement and validate my skills with a large stack, all the tools used will be listed afterwards.

## Running

### Using [Tilt toolkit](https://tilt.dev)

You can easily run all k8s clusters by simply typing on your shell `tilt up`.
You should see, at least, resources for:
- Frontend application
- Backend application
- RabbitMQ
- Postgres
- Redis
- Backend Secrets

### Manually

First of all, ensure you have Postgres, RabbitMQ and Redis services running.
You can run `docker compose up`.

For running the backend application, simply type:
```bash
cd backend
cp .env.example .env
./gradlew bootRun
```
If you want to, you can change `spring.flyway.enabled` or `spring.jpa.hibernate.ddl-auto=update` in `application.properties` for automatic creating the schemas.
But have in mind that flyway migrations were made thinking in the testing database.
You can also check API docs at `http://localhost:3001/api-docs`.

For the frontend:
```bash
cd frontend
cp .env.example .env
npm install

next dev
# or
yarn dev
```

## Testing

### Backend

First, ensure you have `users_crud_test`. When running the tests, flyway should automatically run the migrations for each isolate test.
Then you can test, depending on your interest, by typing:

```bash
./gradlew test
# or
./gradlew testDebug
# or
./gradlew testRelease
```

### Frontend

There are both E2E tests and unit tests.
For running E2E tests, but ensure that your database has runned flyway migrations.
Also, CI/CD isn't running these.
```bash
yarn playwright:test
# or through the ui
yarn playwright:ui
```

For running unit tests:
```bash
yarn test
```

## Stack

### Backend
- Spring Boot with Kotlin
- Spring Security for JWT and Cors Authentication
- RabbitMQ for application logs
- Redis
- Flyway
- Postgres
- Swagger

### Frotend
- Next.js (v15.1.6)
  - Routing
  - i18n
  - Theming
  - Linting
  - Middlewares
  - APIs
- TanStack Query
- shadcn/ui
- React Hook Form
- Zod
- Vitest
- Playwright

### Other
- Docker
- k8s
- Tilt
- GitHub Actions

Inspired by [person-crud](https://github.com/KozielGPC/person-crud).
