import { Text, Pressable, View, StyleSheet, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import Animated from "react-native-reanimated";
import { usePressAnimation } from "@/animations/pressAnimation";

const Access = () => {
  const router = useRouter();
  const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

  const signupAnimation = usePressAnimation();
  const signinAnimation = usePressAnimation();

  return (
    <View className="flex-1 bg-neutral-900 px-5">
      <View className="absolute top-[-120] right-[-120] w-[340] h-[340] rounded-full bg-white/5" />
      <View className="absolute bottom-[-140] left-[-120] w-[360] h-[360] rounded-full bg-white/5" />
      <LinearGradient
        pointerEvents="none"
        colors={[
          "rgba(38,38,38,0.55)",
          "rgba(24,24,27,0.32)",
          "rgba(10,10,10,0.14)",
          "transparent",
        ]}
        style={styles.topGradient}
      />
      <LinearGradient
        pointerEvents="none"
        colors={[
          "rgba(38,38,38,0.55)",
          "rgba(24,24,27,0.32)",
          "rgba(10,10,10,0.14)",
          "transparent",
        ]}
        style={styles.bottomGradient}
      />
      <SafeAreaView className="flex-1">
        {/* Header */}
        <View className="flex-row items-center justify-between pt-2">
          <View className="flex-row items-center gap-2">
            <Image
              source={require("../../assets/images/SixoLogo.webp")}
              style={{ width: 44, height: 44 }}
              resizeMode="contain"
            />
            <Text className="text-white text-3xl font-plexBold">Sixo</Text>
          </View>
          <View className="px-3 py-1.5 rounded-full bg-neutral-800 border border-neutral-700">
            <Text className="text-neutral-300 text-xs font-plexMedium">
              Hospitality
            </Text>
          </View>
        </View>
        {/* Middle Visual */}
        <View className="flex-1 items-center justify-center">
          <Image
            source={require("../../assets/images/middlevisual.webp")}
            style={{ width: 340, height: 260 }}
            resizeMode="contain"
          />

          <Text className="text-white text-4xl font-plexBold text-center mt-10 leading-tight tracking-tight">
            Scheduling built{"\n"}for hospitality.
          </Text>

          <Text className="text-neutral-400 text-base text-center mt-6 leading-6 px-4">
            Create rotas, track attendance, and manage your team from one simple
            app.
          </Text>
        </View>

        <View className="pb-4 gap-3">
          <AnimatedPressable
            onPressIn={signupAnimation.onPressIn}
            onPressOut={signupAnimation.onPressOut}
            style={signupAnimation.animatedStyle}
            onPress={() => router.push("/signup")}
            className="h-14 rounded-2xl bg-white items-center justify-center"
          >
            <Text className="text-neutral-950 text-base font-plexBold">
              Get Started
            </Text>
          </AnimatedPressable>

          <AnimatedPressable
            onPressIn={signinAnimation.onPressIn}
            onPressOut={signinAnimation.onPressOut}
            style={signinAnimation.animatedStyle}
            onPress={() => router.push("/signin")}
            className="h-14 rounded-2xl bg-neutral-800 border border-neutral-700 items-center justify-center"
          >
            <Text className="text-white text-base font-plexBold">Sign In</Text>
          </AnimatedPressable>
        </View>
      </SafeAreaView>
    </View>
  );
};
const styles = StyleSheet.create({
  topGradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 450,
    zIndex: 0,
  },

  bottomGradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 300,
    transform: [{ rotate: "180deg" }],
  },
});

export default Access;
