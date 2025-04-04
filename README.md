### Account Device Manager

This app is composed by different services containerized using Docker, when it's deployed it creates a few components:
- expo-app, react_native_app built with Expo (Typescript)
- account-service, Typescript/NodeJS app providing a gql subgraph
- device-service,  Typescript/NodeJS app providing a gql subgraph
- apollo-router, Federated GQL gateway, it exposes a unified GraphQL schema (supergraph)
- Postgres DB
- Flyway, for initializing the DB schema and prepopulating with some data

#### Architecture
This diagram shows a high level view of the architecture of the app, and how the components interact with each other.
![Device-manager drawio (1)](https://github.com/user-attachments/assets/ce064c8f-d1b7-42fa-b700-6936565c968b)




#### Instructions

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

## Back End Design

The storage is a relational database (Postgres), is a very simple schema with only 3 tables and a minimal amount of columns on each table. Tables `account` & `device` hold their model data, while `account_device` is used for mapping devices to their account.

## Graphql Design

The Graphql requests are served by a Federated Graphql composed by 2 different services: `account-service` & `device-service`.

The router service is provided via Apollo GraphOS.

Most of the Queries, Mutations & Types are contained whithin a single service, except for the entity `Account`:

    type Account {
      id: ID!
      name: String!
      accountDevices: [Device]!
    }

`id` & `name` are served from the `account-service` while `accountDevices` is served by `device-service`, the Account related data is handled by `account-service` and the Device related data by `device-service`. This gives us a very clear separation of concerns.

The attached Query Plan Preview shows the router having to fetch data from both services, before flattening the results to send them back.

<img width="1195" alt="Screenshot 2025-03-27 at 5 06 14 p m" src="https://github.com/user-attachments/assets/4340b993-75b7-4dbe-aa66-4cad373cdb12" />

This Sequence Diagram explains the interactions between the different components when the client makes a request for an Account:
![device-manager-seq drawio](https://github.com/user-attachments/assets/1e831739-3930-4ed4-be19-d5f38a234285)



Also is worth noting the `accounts` query receives an optional pagination input, and returns an `AccountPage` object which can be very useful when displaying paginated results, that was not used on this proof-of-concept react native app though.

## Graphql Direct Testing

Is also possible to interact directly with the Federated Graphql server running on port 4000.

Using a tool like Insomnia is possible to send a request like this:

<img width="1142" alt="Screenshot 2025-03-27 at 5 20 50 p m" src="https://github.com/user-attachments/assets/f80b6e0a-a48e-498a-8a5c-ba20027ad524" />


Note: *Credentials are hard-coded because this is a proof of concept app, on a real world scenario we should store these on Secrets Manager or similar*







