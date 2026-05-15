import { View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import Animated from "react-native-reanimated";
import { usePressAnimation } from "@/animations/pressAnimation";
import { useDispatch, useSelector } from "react-redux";
import { SixoDispatch, RootState } from "@/store";
import { setTeamSize } from "@/store/onboardingSlice";

const TeamSize = () => {
  const router = useRouter();

  const dispatch = useDispatch<SixoDispatch>();
  const teamSize = useSelector((state: RootState) => state.onboarding.teamSize);

  const backAnimation = usePressAnimation();
  const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
  const teamSizeRange = ["1–5", "6–15", "16–30", "31–50", "50+"];

  return (
    <View className="flex-1 bg-neutral-900 px-5">
      <View className="flex-1">
        {/* Header */}
        <View className="flex-row items-center justify-between">
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
          <Text className=" self-end text-neutral-400 text-sm font-plexMedium mb-4 mt-4">
            Step 2 of 4
          </Text>
        </View>

        {/* Content */}
        <View className="flex-1 justify-center">
          <Text className="text-white text-4xl font-plexBold leading-tight">
            How many employees {"\n"}do you manage?
          </Text>
          <Text className="text-neutral-400 text-sm mt-4 leading-7">
            This helps us personalize schedules, staffing, and workforce
            insights.
          </Text>

          <View className="mt-10 gap-3">
            {teamSizeRange.map((size) => {
              const selected = teamSize === size;

              return (
                <Pressable
                  key={size}
                  onPress={() => dispatch(setTeamSize(size))}
                  className={`h-14 rounded-2xl border px-4 justify-center ${selected ? "bg-white border-white" : "bg-neutral-800 border-neutral-700"}`}
                >
                  <Text
                    className={`text-base font-plexBold ${selected ? "text-neutral-950" : "text-white"}`}
                  >
                    {size} employees
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>
        <View className="self-end-safe">
          <Pressable
            disabled={!teamSize}
            onPress={() => router.push("/(onboarding)/finish-setup")}
            className={`h-14 rounded-2xl items-center justify-center ${teamSize ? "bg-blue-600" : "bg-neutral-700"}`}
          >
            <Text className="text-white text-base font-plexBold">Continue</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default TeamSize;
