# Triage Client

Frontend dashboard for Triage, a transaction monitoring and issue resolution tool for payment operations teams.

## Overview

Triage helps surface transactions that require human attention.

The frontend connects to the Triage API and provides an interface for reviewing transactions, investigating issues, and resolving alerts.

## Features

* Attention queue for transactions with unresolved alerts
* Transaction summary dashboard
* View all transactions
* Search transactions by reference or customer email
* Filter transactions by status
* Transaction detail and investigation view
* View issue severity and reason
* Mark alerts as resolved
* Responsive transaction table
* Multi-currency formatting

## Tech Stack

* Next.js
* React
* TypeScript
* Tailwind CSS

## Backend

The frontend consumes the Triage API built with:

* Node.js
* Express
* TypeScript
* Prisma
* PostgreSQL / Supabase
* Zod
* Vitest
* Supertest

Backend repository: https://github.com/Liciacodes/triage-api

## Getting Started

Clone the repository:

```bash
git clone https://github.com/Liciacodes/triage-client.git
cd triage-client
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev -- -p 3001
```

The frontend will run at:

```text
http://localhost:3001
```

The Triage API should be running separately at:

```text
http://localhost:3000
```

## Current Status

Triage is currently under active development.

The current frontend supports the core transaction investigation flow:

```text
Attention Queue
      ↓
Transaction Details
      ↓
Issue Investigation
      ↓
Resolve Alert
```

More features will be added as the project evolves.
