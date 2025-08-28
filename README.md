# REST Client

A REST client application built with **Next.js**, **MikroORM**, and **TypeScript**. This project is designed to serve as a lightweight and extensible client for interacting with REST APIs while leveraging a robust backend powered by MikroORM and PostgreSQL. 

The project is structured to support authentication, database persistence, and integration with multiple credentials.

---

## Features

- **Next.js 15**: Modern framework combining frontend and backend in one, enabling fast SSR and API handling.
- **TypeScript**: Type-safe development for fewer runtime errors and more maintainable code.
- **MikroORM**: Fully type-safe ORM with support for entity modeling using TypeScript decorators, schema migrations, and multiple database drivers (like PostgreSQL).
- **NextAuth**: Seamless authentication and session management out of the box.
- **CodeMirror**: Rich JSON editor for crafting requests and viewing responses with validation.
- **TailwindCSS**: Utility-first styling for rapid and consistent UI development.

---

## Getting Started

### Prerequisites

* Node.js (>= 18)
* PostgreSQL
* A `.env` file with the necessary configuration (database connection, auth secrets, etc.)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/neelansh27/rest-client.git
   cd rest-client
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up your environment variables in a `.env` file. For example:

   ```env
   DATABASE_URL=postgresql://user:password@localhost:5432/rest-client
   NEXTAUTH_SECRET=your-secret-key
   NEXTAUTH_URL=http://localhost:3000
   GITHUB_SECRET=github-secret
   GITHUB_CLIENTID=client-id
   ```

4. Run database migrations with MikroORM:

   ```bash
   npx mikro-orm migration:up
   ```

5. Start the development server:

   ```bash
   npm run dev
   ```

The application will be available at [http://localhost:3000](http://localhost:3000).

---

## Available Scripts

* `npm run dev` – Start the development server.
* `npm run build` – Build the production-ready application.
* `npm run lint` – Run ESLint checks.

---

## Technology Stack

* **Frontend**: Next.js, React, TailwindCSS, CodeMirror
* **Backend**: Next.js API routes, MikroORM, PostgreSQL
* **Authentication**: NextAuth

---

## Contributing

Contributions are welcome. If you would like to add new features, improve documentation, or fix bugs, please fork the repository and open a pull request.
