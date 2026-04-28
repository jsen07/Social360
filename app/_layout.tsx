import { Slot, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "../global.css";

export default function Layout() {
  return (
    <>
      <StatusBar style="dark"/>
      <Stack
        screenOptions={{ headerShown: false, animation: "fade_from_bottom" }}
      />
    </>
  );
}
