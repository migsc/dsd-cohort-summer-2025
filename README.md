# DSD Cohort Summer 2025

**Project**: Home Cleaning & Maintenance Management System

This is the repository for team David & Miguel in the **Dallas Software Developers Group (DSD) Summer 2025 Cohort**. 

## Contributors
<a href="https://github.com/migsc/dsd-cohort-summer-2025/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=migsc/dsd-cohort-summer-2025" />
</a>

Made with [contrib.rocks](https://contrib.rocks).


> ⚠️ **Important:** Please read [the wiki](../../wiki) for guidelines on how to contribute to this project.

## Features
- [ ] List of features that the project will have



## Prerequisites

Before you start, ensure you have the following installed on your machine:

- [ ] Git
- [ ] Node.js
- [ ] Code editor (e.g., Visual Studio Code)
- [ ] Postman or Insomnia (for API testing)
- [ ] MongoDB (or a MongoDB Atlas account)


## Technologies Used
- [**TypeScript**](https://www.typescriptlang.org/) - For type safety and improved developer experience
- [**Next.js**](https://nextjs.org/) - Full-stack React framework
- [**TailwindCSS**](https://tailwindcss.com/) - Utility-first CSS for rapid UI development
- [**shadcn/ui**](https://ui.shadcn.com/) - Reusable UI components
- [**tRPC**](https://trpc.io/) - End-to-end type-safe APIs
- [**Node.js**](https://nodejs.org/) - Runtime environment
- [**Prisma**](https://www.prisma.io/) - TypeScript-first ORM
- [**MongoDB**](https://www.mongodb.com/) - Database engine
- [**Authentication**](https://github.com/edmundhung/better-auth) - Email & password authentication with Better Auth
- [**Turborepo**](https://turbo.build/repo) - Optimized monorepo build system

## Installation

To get started with this project, follow these steps to clone the repository and install the necessary dependencies.

1. Clone the repository:
```bash
git clone https://github.com/migsc/dsd-cohort-summer-2025.git
cd dsd-cohort-summer-2025
```

2. Install the dependencies:
```bash
npm install
```

## Database Setup

This project uses MongoDB with Prisma ORM.

1. Make sure you have MongoDB set up.
2. Update your `apps/server/.env` file with your MongoDB connection URI.

3. Generate the Prisma client and push the schema:
```bash
npm run db:push
```

## Running

To run the project, you can start both the web application and the server API together using the following command:
```bash
npm run dev
```

Open [http://localhost:3001](http://localhost:3001) in your browser to see the web application.
The API is running at [http://localhost:3000](http://localhost:3000).


## Project Structure

```
apps/
├── web/            # Frontend application (Next.js)
│   ├── src/
│   │   ├── app/            # App directory (routing, pages)
│   │   ├── components/     # React components (UI, forms, etc.)
│   │   ├── lib/            # Client-side utilities
│   │   └── utils/          # tRPC client utils
│   ├── next.config.ts      # Next.js config
│   ├── package.json        # Web app dependencies
│   └── ...
├── server/         # Backend API (Next.js, tRPC, Prisma)
│   ├── src/
│   │   ├── app/            # API routes (REST, tRPC)
│   │   ├── lib/            # Server-side logic (auth, context, trpc)
│   │   └── routers/        # tRPC routers
│   ├── prisma/
│   │   ├── schema/         # Prisma schema files
│   │   └── generated/      # Generated Prisma client
│   ├── next.config.ts      # Next.js config
│   ├── package.json        # Server app dependencies
│   └── ...
```

## Available Scripts

- `npm run dev`: Start all applications in development mode
- `npm run build`: Build all applications
- `npm run dev:web`: Start only the web application
- `npm run dev:server`: Start only the server
- `npm run check-types`: Check TypeScript types across all apps
- `npm run db:push`: Push schema changes to database
- `npm run db:studio`: Open database studio UI
