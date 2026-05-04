import { Stack, Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import type { AuthUser } from "aws-amplify/auth";
import { getCurrentUser } from "aws-amplify/auth";
import "../../global.css";

export default function Layout() {
  // const router = useRouter();

  // const [user, setUser] = useState<AuthUser | null>(null);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     try {
  //       const currentUser = await getCurrentUser();
  //       setUser(currentUser);
  //     } catch {
  //       setUser(null);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchUser();
  // }, []);

  return (
    // <Stack screenOptions={{ headerShown: false, animation: "fade" }}>
    //   <Stack.Screen name="index" />
    //   <Stack.Screen name="profile" />
    // </Stack>
    <Stack
      screenOptions={{ headerShown: false, animation: "fade_from_bottom" }}
    />
  );
}
