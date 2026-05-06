import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation CreateUser($email: String!, $cognitoSub: String!) {
    createUser(email: $email, cognitoSub: $cognitoSub) {
      id
      email
      cognitoSub
    }
  }
`;

export const INVITE_EMPLOYEE = gql`
  mutation InviteEmployee($email: String!, $companyId: ID!, $role: String!) {
    inviteEmployee(email: $email, companyId: $companyId, role: $role)
  }
`;

export const CREATE_BUSINESS_ACCOUNT = gql`
  mutation CreateBusinessAccount(
    $email: String!
    $cognitoSub: String!
    $fullname: String!
    $comapanyName: String!
    $role: String!
  ) {
    createBusinessAccount(
      email: $email
      cognitoSub: $cognitoSub
      fullname: $fullname
      companyName: $companyName
      role: $role
    )
  }
`;
