<div align="center" class="text-center">
  <h1>Users CRUD</h1>
  <br>
  <b>Empowering Seamless User Management at Scale</b>
  <br>
  
  ![last-commit](https://img.shields.io/github/last-commit/qedrohenrique/users-crud?style=flat&logo=git&logoColor=white&color=0080ff)
  ![repo-top-language](https://img.shields.io/github/languages/top/qedrohenrique/users-crud?style=flat&color=0080ff)
  ![repo-language-count](https://img.shields.io/github/languages/count/qedrohenrique/users-crud?style=flat&color=0080ff)

  *Built with the tools and technologies:*
  
  ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6.svg?style=flat&logo=TypeScript&logoColor=white)
  ![Next JS](https://img.shields.io/badge/Next-black?style=flat&logo=next.js&logoColor=white)
  ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=flat&logo=tailwind-css&logoColor=white)
  ![Zod](https://img.shields.io/badge/Zod-3E67B1.svg?style=flat&logo=Zod&logoColor=white)
  ![ESLint](https://img.shields.io/badge/ESLint-4B32C3.svg?style=flat&logo=ESLint&logoColor=white)
  ![React Hook Form](https://img.shields.io/badge/React%20Hook%20Form-EC5990.svg?style=flat&logo=React-Hook-Form&logoColor=white)
  ![React Query](https://img.shields.io/badge/-React%20Query-FF4154?style=flat&logo=react%20query&logoColor=white)
  ![Vitest](https://img.shields.io/badge/Vitest-6E9F18.svg?style=flat&logo=Vitest&logoColor=white)
  ![Playwright](https://img.shields.io/badge/-playwright-%232EAD33?style=flat&logo=Playwright&logoColor=white)

  ![Kotlin](https://img.shields.io/badge/Kotlin-7F52FF.svg?style=flat&logo=Kotlin&logoColor=white)
  ![Spring](https://img.shields.io/badge/spring-%236DB33F.svg?style=flat&logo=spring&logoColor=white)
  ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1.svg?style=flat&logo=PostgreSQL&logoColor=white)
  ![Redis](https://img.shields.io/badge/Redis-FF4438.svg?style=flat&logo=Redis&logoColor=white)
  ![RabbitMQ](https://img.shields.io/badge/RabbitMQ-FF6600.svg?style=flat&logo=RabbitMQ&logoColor=white)
  ![Swagger](https://img.shields.io/badge/-Swagger-%23Clojure?style=flat&logo=swagger&logoColor=white)

  ![Docker](https://img.shields.io/badge/Docker-2496ED.svg?style=flat&logo=Docker&logoColor=white)
  ![GitHub Actions](https://img.shields.io/badge/GitHub%20Actions-2088FF.svg?style=flat&logo=GitHub-Actions&logoColor=white)
  ![Kubernetes](https://img.shields.io/badge/kubernetes-%23326ce5.svg?style=flat&logo=kubernetes&logoColor=white)


</div>

# Overview

users-crud is a comprehensive user management microservice that enables seamless creation, retrieval, updating, and deletion of user data within a scalable architecture. Leveraging modern tools like Spring Boot, Next.js, and Kubernetes, it provides a robust foundation for user operations, authentication, and real-time logging.

## Demo

User creation and real-time logging demo:

![](demo.mp4)

## Features

<ul class="list-disc pl-4 my-0">
<li class="my-0">🧩 <strong>Database &amp; Messaging:</strong> Containerized PostgreSQL, RabbitMQ, and Redis for reliable data storage, messaging, and caching.</li>
<li class="my-0">🚀 <strong>Scalable Deployment:</strong> Automated build and deployment pipelines with Tiltfile and Kubernetes support.</li>
<li class="my-0">🔒 <strong>Secure &amp; Role-Based:</strong> Environment-specific secrets and role management for secure access control.</li>
<li class="my-0">🌐 <strong>Internationalization:</strong> Built-in support for multiple languages, enhancing global accessibility.</li>
<li class="my-0">📊 <strong>Observability:</strong> Real-time logging and monitoring for improved debugging and system insights.</li>
</ul>

## 💻 Running

### Using [Tilt toolkit](https://tilt.dev)

Ensure you have a kind cluster created:

```bash
kind create cluster
```

Then you can easily run all k8s clusters by simply typing on your shell `tilt up`.
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

## 🧪 Testing

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

---

Inspired by [person-crud](https://github.com/KozielGPC/person-crud).

Pedro Henrique de Almeida © 2025 - All rights reserved
