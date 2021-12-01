# Telbby Backend

<br />
<p align="center">
  <img src="https://user-images.githubusercontent.com/22045163/141472494-00de9d64-1f05-4b1c-bb29-3f688368136c.png" alt="logo" width="150px" />
</p>

This is **BackEnd Repository** of **Telbby**, a service that can be introduced into my project to exchange feedback with various users.

> [Go to FrontEnd Repository](https://github.com/telbby/telbby-frontend)

## Tech Stack

- TypeScript
- Node.js
- Express
- TypeDI
- TypeORM
- Heroku
- MySQL

## Project Structure

```bash
src
├── api
    ├── routes          # routes & controllers
    ├── middlewares     # middlewares
    ├── validation      # backend validation
    └── index.ts
├── config              # environment variables and configuration
├── constants           # constants
├── entity              # database entities
├── helpers             # helper functions
├── loaders             # startup process modules
├── repositories        # database access logic
├── services            # business logic
├── types               # types
├── utils               # utility functions
└── app.ts              # App entry point
tests
├── helpers
└── utils
```

## Getting Started

### Prerequisites

- Install [Node.js](https://nodejs.org/).
- Refer to the `.mock.env` file and create the `.env` file in the root directory. 

### Run

development mode

```bash
yarn install
yarn dev
```

production mode

```bash
yarn install
yarn build
yarn start
```

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.
