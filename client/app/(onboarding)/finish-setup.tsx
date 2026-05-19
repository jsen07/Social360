import { View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import Animated from "react-native-reanimated";
import { usePressAnimation } from "@/animations/pressAnimation";
import { useDispatch, useSelector } from "react-redux";
import { SixoDispatch, RootState } from "@/store";

const FinishSetup = () => {
  const router = useRouter();
  const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
  const backAnimation = usePressAnimation();

  const fullname = useSelector((state: RootState) => state.onboarding.fullname);
  const userRole = useSelector((state: RootState) => state.onboarding.userRole);
  const businessName = useSelector(
    (state: RootState) => state.onboarding.businessName,
  );
  const businessType = useSelector(
    (state: RootState) => state.onboarding.businessType,
  );
  const locations = useSelector(
    (state: RootState) => state.onboarding.numberOfLocations,
  );
  const teamSize = useSelector((state: RootState) => state.onboarding.teamSize);

  return (
    <View className="flex-1 bg-neutral-900 px-5">
      {/* Content */}
      <View className="gap-4 flex-1">
        <Text className="text-white text-4xl font-plexBold leading-tight mt-4">
          You're almost ready.
        </Text>
        <Text className="text-neutral-400 text-sm leading-7">
          We'll create your workspace and prepare your team setup.
        </Text>
        <View className="bg-neutral-800 border border-neutral-700 rounded-3xl p-5 gap-5 mt-10">
          {/* Role */}
          <View className="flex-row items-center justify-between">
            <Text className="text-neutral-400 text-sm font-plexMedium">
              Your Role
            </Text>

            <Text className="text-white text-base font-plexSemiBold">
              {userRole}
            </Text>
          </View>
          <View className="h-[1px] bg-neutral-700/60" />
          {/* Business Name */}
          <View className="flex-row items-center justify-between">
            <Text className="text-neutral-400 text-sm font-plexMedium">
              Business Name
            </Text>

            <Text className="text-white text-base font-plexSemiBold text-right max-w-[180]">
              {businessName}
            </Text>
          </View>
          <View className="h-[1px] bg-neutral-700/60" />

          {/* Business Type */}
          <View className="flex-row items-center justify-between">
            <Text className="text-neutral-400 text-sm font-plexMedium">
              Business Type
            </Text>

            <Text className="text-white text-base font-plexSemiBold">
              {businessType}
            </Text>
          </View>
          <View className="h-[1px] bg-neutral-700/60" />

          {/* Locations */}
          {locations && (
            <>
              <View className="flex-row items-center justify-between">
                <Text className="text-neutral-400 text-sm font-plexMedium">
                  Locations
                </Text>

                <Text className="text-white text-base font-plexSemiBold">
                  {locations}
                </Text>
              </View>
              <View className="h-[1px] bg-neutral-700/60" />
            </>
          )}

          {/* Team Size */}
          <View className="flex-row items-center justify-between">
            <Text className="text-neutral-400 text-sm font-plexMedium">
              Team Size
            </Text>

            <Text className="text-white text-base font-plexSemiBold">
              {teamSize}
            </Text>
          </View>
        </View>
      </View>
      <View className="flex-1 justify-center items-center">
        <Text className="text-neutral-400 text-sm leading-7">
          You can change and add more details in the settings later.
        </Text>
      </View>
      <View className="self-end-safe">
        <Pressable
          onPress={() => router.push("/create-workspace")}
          className="h-14 rounded-2xl items-center justify-center bg-blue-600"
        >
          <Text className="text-white text-base font-plexBold">
            Create Workspace
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default FinishSetup;
