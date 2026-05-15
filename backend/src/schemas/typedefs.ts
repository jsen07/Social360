export const typeDefs = `#graphql
  type User {
    id: ID!
    email: String!
    cognitoSub: String!
    fullname: String
    birthdate: String
    gender: String
    createdAt: String
    companies: [Company!]!
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
    businessType: String,
    numberOfLocations: Int,
    employeeCountRange: String
    hasCompletedOnboarding: Boolean!
    role: String!
  }

  type Query {
    users: [User]
    getUserProfile: User
  }

  type Mutation {
    createUser(email: String!): User
    inviteEmployee(email: String!, companyId: ID!, role: String!): Boolean
    saveOnboardingDetails(fullname: String!, companyRole: String!, companyName: String!, businessType: String!, numberOfLocations: Int, employeeCountRange: String!): Company
  }
`;
