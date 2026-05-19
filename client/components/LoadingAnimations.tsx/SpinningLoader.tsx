import { View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
  withDelay,
} from "react-native-reanimated";
import { useEffect } from "react";

const SuccessLoader = () => {
  const rotation = useSharedValue(0);

  const spinnerOpacity = useSharedValue(1);

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, {
        duration: 900,
        easing: Easing.linear,
      }),
      -1,
      false,
    );
  }, []);

  const spinnerStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  return (
    <View className="items-center justify-center w-28 h-28">
      {/* Spinner */}
      <Animated.View
        style={spinnerStyle}
        className="absolute w-28 h-28 rounded-full border-[4px] border-neutral-700 border-t-blue-500"
      />
    </View>
  );
};

export default SuccessLoader;
