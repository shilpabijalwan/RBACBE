# RBACBE

Node.js backend with Express, CORS, and PostgreSQL.

## Prerequisites

- Node.js 18+
- PostgreSQL (local or remote)

## Setup

```bash
npm install
```

## Environment (optional)

Create a `.env` file to override defaults:

```env
PORT=4000
PG_HOST=localhost
PG_PORT=5432
PG_DATABASE=postgres
PG_USER=postgres
PG_PASSWORD=your_password
```

## Run

```bash
npm start
```

Development with auto-reload:

```bash
npm run dev
```

## Endpoints

- `GET /health` — Health check
- `GET /db` — Test PostgreSQL connection
