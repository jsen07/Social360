import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";

export default function Layout() {
  return (
    <View className="flex-1 bg-neutral-900">
      <StatusBar style="light" />

      <Stack
        screenOptions={{
          headerShown: false,
          animation: "slide_from_right",
          contentStyle: {
            backgroundColor: "#171717",
          },
        }}
      >
        <Stack.Screen name="access" />
      </Stack>
    </View>
  );
}
