import { gql } from "apollo-server-express";

const Schema = gql`
    extend schema
    @link(url: "https://specs.apollo.dev/federation/v2.7",
            import: ["@key"])

    enum SortDirection {
        asc
        desc
        ASC
        DESC
    }

    input PaginationInput {
        offset: Int
        limit: Int
        sortBy: String
        sortDirection: SortDirection
    }

    input CreateAccountInput {
        name: String!
    }

    type Account @key(fields: "id") {
        id: ID!
        name: String!
    }

    type AccountPage {
        count: Int!
        items: [Account]!
    }

    type Query {
        account(id: ID!): Account
        accounts(pagination: PaginationInput): AccountPage
    }

    type Mutation {
        createAccount(input: CreateAccountInput!): Account
    }
`;

export default Schema; 
