import { View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import Animated from "react-native-reanimated";
import { usePressAnimation } from "@/animations/pressAnimation";

const CreateWorkspace = () => {
  const router = useRouter();
  const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
  const backAnimation = usePressAnimation();
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
        </View>
        {/* Content */}
        <View className="gap-4 flex-1">
          <Text className="text-white text-4xl font-plexBold leading-tight mt-4">
            Your workspace is{"\n"}ready set up.
          </Text>
          <Text className="text-neutral-400 text-sm leading-7">
            Invite staff, build a rota, and get your team ready.
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
    </View>
  );
};

export default CreateWorkspace;
