Account Device Manager

This app is composed by different services containerized using Docker, when it's deployed it creates a few components:
- expo-app, react_native_app built with Expo (Typescript)
- account-service, Typescript/NodeJS app providing a gql subgraph
- device-service,  Typescript/NodeJS app providing a gql subgraph
- apollo-router, Federated GQL gateway, it exposes a unified GraphQL schema (supergraph)
- Postgres DB
- Flyway, for initializing the DB schema and prepopulating with some data

## Instructions

After cloning the repo, from the root directory build the app with:
> docker compose build

Then you can run it with:
> docker compose up -d


Once you are done, it can be stopped with:
> docker compose down

## Using the app
On your browser you can go to:
> http://localhost:8081

This is a react native app, its landing page displays a list of accounts and their devices.

