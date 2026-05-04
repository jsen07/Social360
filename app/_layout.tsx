import { Stack, Redirect } from "expo-router";
import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import "../global.css";
import { Amplify } from "aws-amplify";
import { Hub } from "aws-amplify/utils";
import outputs from "../amplify_outputs.json";
import type { AuthUser } from "aws-amplify/auth";
import { getCurrentUser } from "aws-amplify/auth";

Amplify.configure(outputs);
export default function Layout() {
  const { user, loading, isLoggedIn } = useAuth();
  // const [user, setUser] = useState<AuthUser | null>(null);
  // const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  // const [loading, setLoading] = useState<boolean>(true);

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     try {
  //       const currentUser = await getCurrentUser();
  //       setUser(currentUser);
  //       setIsLoggedIn(true);
  //     } catch {
  //       setUser(null);
  //       setIsLoggedIn(false);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchUser();
  // }, []);

  // if (loading) return null;

  // if (!user) {
  //   return <Redirect href="/(auth)/access" />;
  // }
  return (
    <>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{ headerShown: false, animation: "fade_from_bottom" }}
      >
        <Stack.Protected guard={isLoggedIn}>
          <Stack.Screen name="(app)" />
        </Stack.Protected>
        <Stack.Protected guard={!isLoggedIn}>
          <Stack.Screen name="(auth)" />
        </Stack.Protected>
      </Stack>
    </>
  );
}
