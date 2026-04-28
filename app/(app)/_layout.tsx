import { Stack, Redirect } from "expo-router";

export default function Layout() {
  const user = null; // replace with real auth (Firebase, AsyncStorage, etc.)

  if (!user) {
    return <Redirect href="/access" />;
  }

  return (
    <>
      <Stack
        screenOptions={{ headerShown: false, animation: "fade" }}
      />
    </>
  );
}
