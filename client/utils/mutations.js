import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation CreateUser($email: String!) {
    createUser(email: $email) {
      id
      email
      fullname
      birthdate
      gender
      createdAt
    }
  }
`;

export const INVITE_EMPLOYEE = gql`
  mutation InviteEmployee($email: String!, $companyId: ID!, $role: String!) {
    inviteEmployee(email: $email, companyId: $companyId, role: $role)
  }
`;

export const SAVE_ONBOARDING_DETAILS = gql`
  mutation SaveOnboardingDetails(
    $fullname: String!
    $companyRole: String!
    $companyName: String!
    $businessType: String!
    $numberOfLocations: Int
    $employeeCountRange: String!
  ) {
    saveOnboardingDetails(
      fullname: $fullname
      companyRole: $companyRole
      companyName: $companyName
      businessType: $businessType
      numberOfLocations: $numberOfLocations
      employeeCountRange: $employeeCountRange
    ) {
      id
      name
      hasCompletedOnboarding
    }
  }
`;
