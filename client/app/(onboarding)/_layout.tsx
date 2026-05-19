import { Stack, usePathname } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View, Text, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import Animated from "react-native-reanimated";
import { usePressAnimation } from "@/animations/pressAnimation";
import { ArrowLeft } from "lucide-react-native";

const steps = ["user-details", "business-details", "team-size", "finish-setup"];
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function Layout() {
  const backAnimation = usePressAnimation();
  const router = useRouter();
  const pathname = usePathname();

  const currentStepIndex = Math.max(
    0,
    steps.findIndex((step) => pathname.includes(step)),
  );

  const hideProgressBar = pathname.includes("create-workspace");

  const isFirstStep = currentStepIndex === 0;

  return (
    <SafeAreaView className="flex-1 bg-neutral-900">
      {!hideProgressBar && (
        <View className="gap-2 px-5">
          <View className="flex-row gap-2 mt-2">
            {steps.map((_, index) => (
              <View
                key={index}
                className={`h-1.5 flex-1 rounded-full ${
                  index <= currentStepIndex ? "bg-white" : "bg-neutral-700"
                }`}
              />
            ))}
          </View>

          <View
            className={`justify-between py-1.5 items-center ${!isFirstStep ? "flex-row" : ""}`}
          >
            {!isFirstStep && (
              <AnimatedPressable
                onPressIn={backAnimation.onPressIn}
                onPressOut={backAnimation.onPressOut}
                style={backAnimation.animatedStyle}
                onPress={() => router.back()}
                className="flex-row items-center active:opacity-70"
              >
                <ArrowLeft size={18} color="#a3a3a3" />
                <Text className="text-neutral-400 font-plexMedium ml-1 text-base">
                  Previous
                </Text>
              </AnimatedPressable>
            )}
            <Text className="self-end text-neutral-400 text-base font-plexMedium">
              Step {currentStepIndex + 1} of {steps.length}
            </Text>
          </View>
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
