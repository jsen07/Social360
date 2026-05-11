import {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

export function usePressAnimation() {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const onPressIn = () => {
    scale.value = withTiming(0.98, {
      duration: 120,
    });
  };

  const onPressOut = () => {
    scale.value = withTiming(1, {
      duration: 140,
    });
  };

  return {
    animatedStyle,
    onPressIn,
    onPressOut,
  };
}
