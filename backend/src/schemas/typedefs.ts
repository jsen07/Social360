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

  type Company {
    id: ID!
    name: String!
    businessType: String,
    numberOfLocations: Int,
    employeeCountRange: String
    hasCompletedOnboarding: Boolean!
    accountRole: String!
  }

  type Department {
  id: ID!
  name: String!
  }

  type Invitation {
    id: ID!
    email: String!
    companyId: ID!
    accountRole: String!
    token: String!
  }

  type Query {
    users: [User]
    getUserProfile: User
  }

  type Mutation {
    createUser(email: String!): User
    inviteEmployee(email: String!, companyId: ID!, accountRole: String!): Boolean
    saveOnboardingDetails(fullname: String!, companyRole: String!, companyName: String!, businessType: String!, numberOfLocations: Int, employeeCountRange: String!): Company
    addDepartments(companyId: ID!, names: [String!]!): [Department!]!
      }
`;
