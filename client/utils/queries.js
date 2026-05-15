import { gql } from "@apollo/client";

export const GET_USER_PROFILE = gql`
  query GetUserProfile {
    getUserProfile {
      id
      email
      fullname
      birthdate
      gender
      createdAt

      companies {
        id
        name
        hasCompletedOnboarding
        role
      }
    }
  }
`;
