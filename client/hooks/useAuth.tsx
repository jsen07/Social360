import React, { useState, useEffect } from "react";
import { getCurrentUser } from "aws-amplify/auth";
import type { AuthUser } from "aws-amplify/auth";
import { Hub } from "aws-amplify/utils";
import { useLazyQuery } from "@apollo/client";
import { GET_USER_PROFILE } from "../utils/queries";
import { router } from "expo-router";

interface UseAuthResult {
  authUser: AuthUser | null;
  profile: any | null;
  hasCompletedOnboarding: boolean;
  loading: boolean;
  isLoggedIn: boolean;
  refreshProfile: () => Promise<void>;
  isDBConnected: boolean;
}
export default function useAuth(): UseAuthResult {
  const [getUserProfile] = useLazyQuery(GET_USER_PROFILE, {
    fetchPolicy: "network-only",
  });
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);
  const [profile, setProfile] = useState<any | null>(null);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] =
    useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isDBConnected, setIsDBConnected] = useState<boolean>(false);

  const refreshProfile = async () => {
    const currentAuthUser = await getCurrentUser();
    setAuthUser(currentAuthUser);
    setIsLoggedIn(true);
    try {
      const { data, error } = await getUserProfile({
        variables: {
          cognitoSub: currentAuthUser.userId,
        },
      });
      const profile = data?.getUserProfile ?? null;
      const company = profile?.companies?.[0];
      setProfile(profile);
      setHasCompletedOnboarding(company?.hasCompletedOnboarding === true);
      setIsDBConnected(true);

      console.log(data);
      if (error && !data) setIsDBConnected(false);
    } catch (error: any) {
      setProfile(null);
      setHasCompletedOnboarding(false);
      setIsDBConnected(false);
    }
  };

  //check for initial user
  useEffect(() => {
    const initializeUser = async () => {
      try {
        setLoading(true);
        await refreshProfile();
      } catch (error: any) {
        setAuthUser(null);
        setProfile(null);
        setHasCompletedOnboarding(false);
        setIsLoggedIn(false);
        setIsDBConnected(false);
      } finally {
        setLoading(false);
      }
    };

    //listen for auth events
    const hubListenerCancelToken = Hub.listen("auth", async ({ payload }) => {
      switch (payload.event) {
        case "signedIn":
        case "signInWithRedirect":
          await initializeUser();
          break;
        case "signedOut":
        case "signInWithRedirect_failure":
          setAuthUser(null);
          setProfile(null);
          setHasCompletedOnboarding(false);
          setIsLoggedIn(false);
          setIsDBConnected(false);
          console.log("You have been signed out.");
          break;
      }
    });

    initializeUser();
    return () => {
      hubListenerCancelToken();
    };
  }, []);

  return {
    authUser,
    profile,
    hasCompletedOnboarding,
    loading,
    isLoggedIn,
    refreshProfile,
    isDBConnected,
  };
}
