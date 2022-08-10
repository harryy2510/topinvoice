# TOP INVOICE

This is an invoicing software for freelancers.

- [Demo](https://topinvoice.in) - https://topinvoice.in
- [Introduction](#introduction)
  - [Development mode](#development-mode)
  - [Production mode](#production-mode)
- [Quick Start](#quick-start)

## Introduction

This is a simple full stack [React](https://reactjs.org/) application with a [Nest.js](https://nestjs.com) backend utilising a monorepo structure using [Lerna](https://lerna.com). Client side code is written in React and the backend API is written using Graphql.

### Development mode

In the development mode, we will have 2 servers running. The front end code will be served by the [Create React App](https://github.com/facebook/create-react-app). The server side code will be served using [Nestjs CLI](https://docs.nestjs.com/cli/overview) which helps in automatically restarting the server whenever server side code changes.

API hooks are auto-generated using [Codegen](https://www.graphql-code-generator.com). There will be a separate watcher running the codegen. Everytime a graphql schema file is created or updated, a corresponding api is generated.

Database and redis server is booted up using [Docker Compose](https://docs.docker.com/compose).

### Production mode

In the production mode, we will have only 1 server running. All the client side code will be bundled into static files and will be served by the Nest.js application.

## Quick Start

```bash
# Clone the repository
git clone https://github.com/harryy2510/topinvoice

# Go inside the directory
cd topinvoice

# Install dependencies
yarn

# Create env
cp env.sample .env

# Edit env
nano .env

# Start development server
yarn dev

# Start code generation
yarn codegen

# Build for production
yarn build

# Start production server
yarn start
```

