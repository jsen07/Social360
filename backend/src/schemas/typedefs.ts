export const typeDefs = `#graphql
  type User {
    id: ID!
    email: String!
    fullname: String!
    cognitoSub: String!
  }

  type Invitation {
    id: ID!
    email: String!
    companyId: ID!
    role: String!
    token: String!
  }

  type Company {
    id: ID!
    name: String!
  }

  type createBusinessAccountResponse {
    user: User!
    company: Company!
    role: String!
  }

  type Query {
    users: [User]
  }

  type Mutation {
    createUser(email: String!, cognitoSub: String!): User
    inviteEmployee(email: String!, companyId: ID!, role: String!): Boolean
    createBusinessAccount(
    email: String!
    cognitoSub: String!
    fullname: String!
    companyName: String!
    role: String!
  ): createBusinessAccountResponse
  }
`;
