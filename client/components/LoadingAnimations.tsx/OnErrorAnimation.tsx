import { View } from "react-native";
import React, { useEffect } from "react";
import { CircleSlash } from "lucide-react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withTiming,
  withSpring,
  Easing,
  FadeIn,
} from "react-native-reanimated";

const AnimatedView = Animated.createAnimatedComponent(View);

const OnErrorAnimation = () => {
  const scale = useSharedValue(0.6);
  const rotation = useSharedValue(0);
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withTiming(1, {
      duration: 300,
      easing: Easing.out(Easing.ease),
    });

    scale.value = withSequence(withSpring(1.12), withSpring(1));

    rotation.value = withSequence(
      withTiming(-8, { duration: 80 }),
      withTiming(8, { duration: 80 }),
      withTiming(-6, { duration: 80 }),
      withTiming(6, { duration: 80 }),
      withTiming(0, { duration: 80 }),
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }, { rotate: `${rotation.value}deg` }],
  }));

  return (
    <Animated.View entering={FadeIn.duration(300)}>
      <Animated.View
        style={animatedStyle}
        className="w-28 h-28 rounded-full items-center justify-center bg-red-500"
      >
        <CircleSlash size={48} color="#ffffff" strokeWidth={3} />
      </Animated.View>
    </Animated.View>
  );
};

export default OnErrorAnimation;
