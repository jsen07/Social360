import React, { useState, useEffect } from "react";
import { getCurrentUser } from "aws-amplify/auth";
import type { AuthUser } from "aws-amplify/auth";
import { Hub } from "aws-amplify/utils";

interface UseAuthResult {
  user: AuthUser | null;
  loading: boolean;
  isLoggedIn: boolean;
}
export default function useAuth(): UseAuthResult {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  //check for initial user
  useEffect(() => {
    const initializeUser = async () => {
      try {
        const user = await getCurrentUser();
        setUser(user);
        setIsLoggedIn(true);
        console.log("Logged in user:", user);
      } catch (error: any) {
        setUser(null);
        setIsLoggedIn(false);
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
          setUser(null);
          setIsLoggedIn(false);
          console.log("You have been signed out.");
          break;
      }
    });

    initializeUser();
    return () => {
      hubListenerCancelToken();
    };
  }, []);

  return { user, loading, isLoggedIn };
}
