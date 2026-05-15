import { Stack, usePathname } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const steps = ["user-details", "business-details", "team-size", "finish-setup"];

export default function Layout() {
  const pathname = usePathname();

  const hideProgressBar =
    pathname.includes("finish-setup") || pathname.includes("create-workspace");

  const currentStepIndex = Math.max(
    0,
    steps.findIndex((step) => pathname.includes(step)),
  );

  return (
    <SafeAreaView className="flex-1 bg-neutral-900">
      {!hideProgressBar && (
        <View className="flex-row gap-2 mt-2 px-5">
          {steps.map((_, index) => (
            <View
              key={index}
              className={`h-1.5 flex-1 rounded-full ${
                index <= currentStepIndex ? "bg-white" : "bg-neutral-700"
              }`}
            />
          ))}
        </View>
      )}
      <Stack
        screenOptions={{
          headerShown: false,
          animation: "slide_from_right",
          contentStyle: {
            backgroundColor: "#171717",
          },
        }}
      >
        <Stack.Screen name="user-details" />
        <Stack.Screen name="business-details" />
        <Stack.Screen name="team-size" />
        <Stack.Screen name="finish-setup" />
        <Stack.Screen name="create-workspace" />
      </Stack>
    </SafeAreaView>
  );
}
