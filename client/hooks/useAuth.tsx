import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { getCurrentUser } from "aws-amplify/auth";
import type { AuthUser } from "aws-amplify/auth";
import { Hub } from "aws-amplify/utils";
import { useLazyQuery } from "@apollo/client";
import { GET_USER_PROFILE } from "@/utils/queries";

type AuthContextType = {
  authUser: AuthUser | null;
  profile: any | null;
  hasCompletedOnboarding: boolean;
  loading: boolean;
  isLoggedIn: boolean;
  isDBConnected: boolean;
  refreshProfile: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
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

  const clearAuthState = () => {
    setAuthUser(null);
    setProfile(null);
    setHasCompletedOnboarding(false);
    setIsLoggedIn(false);
    setIsDBConnected(false);
  };

  const refreshProfile = async () => {
    const currentAuthUser = await getCurrentUser();

    setAuthUser(currentAuthUser);
    setIsLoggedIn(true);

    try {
      const { data, error } = await getUserProfile();

      if (error || !data) {
        setProfile(null);
        setHasCompletedOnboarding(false);
        setIsDBConnected(false);
        return;
      }

      const profile = data.getUserProfile ?? null;
      const company = profile?.companies?.[0];

      setProfile(profile);
      setHasCompletedOnboarding(company?.hasCompletedOnboarding === true);
      setIsDBConnected(true);
    } catch {
      setProfile(null);
      setHasCompletedOnboarding(false);
      setIsDBConnected(false);
    }
  };

  useEffect(() => {
    const initializeUser = async () => {
      try {
        setLoading(true);
        await refreshProfile();
      } catch {
        clearAuthState();
      } finally {
        setLoading(false);
      }
    };

    const unsubscribe = Hub.listen("auth", async ({ payload }) => {
      switch (payload.event) {
        case "signedIn":
        case "signInWithRedirect":
          await initializeUser();
          break;

        case "signedOut":
        case "signInWithRedirect_failure":
          clearAuthState();
          break;
      }
    });

    initializeUser();

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        authUser,
        profile,
        hasCompletedOnboarding,
        loading,
        isLoggedIn,
        isDBConnected,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
