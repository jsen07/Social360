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

const OnCompleteAnimation = () => {
  const leftTickWidth = useSharedValue(0);
  const rightTickWidth = useSharedValue(0);

  const tickOpacity = useSharedValue(0);

  useEffect(() => {
    tickOpacity.value = withTiming(1, { duration: 250 });

    leftTickWidth.value = withTiming(22, { duration: 220 });

    rightTickWidth.value = withDelay(90, withTiming(48, { duration: 280 }));
  }, []);

  const tickContainerStyle = useAnimatedStyle(() => ({
    opacity: tickOpacity.value,
  }));

  const leftTickStyle = useAnimatedStyle(() => ({
    width: leftTickWidth.value,
  }));

  const rightTickStyle = useAnimatedStyle(() => ({
    width: rightTickWidth.value,
  }));

  return (
    <View className="w-28 h-28">
      {/* Tick */}
      <Animated.View
        style={tickContainerStyle}
        className="w-28 h-28 items-center justify-center"
      >
        <View className="flex-row items-center border rounded-full w-28 h-28 justify-center bg-blue-500 pr-2">
          {/* Left Tick */}
          <Animated.View
            style={[
              leftTickStyle,
              {
                transform: [
                  { rotate: "55deg" },
                  { translateY: -5 },
                  { translateX: 18 },
                ],
              },
            ]}
            className="h-[6px] bg-white rounded-full mr-[-2px]"
          />

          {/* Right Tick */}
          <Animated.View
            style={[
              rightTickStyle,
              {
                transform: [{ rotate: "-55deg" }],
              },
            ]}
            className="h-[6px] bg-white rounded-full origin-left"
          />
        </View>
      </Animated.View>
    </View>
  );
};

export default OnCompleteAnimation;
