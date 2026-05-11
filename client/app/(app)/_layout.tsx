import { Stack } from "expo-router";
import { View, ActivityIndicator } from "react-native";
import { Image } from "expo-image";
import { useAssets } from "expo-asset";
import "../../global.css";

export default function Layout() {
  const [assets] = useAssets([require("../../assets/images/middlevisual.png")]);

  if (!assets) {
    return (
      <View className="flex-1 items-center justify-center bg-neutral-900">
        <ActivityIndicator color="#3B82F6" />
      </View>
    );
  }

  return (
    <Stack
      screenOptions={{ headerShown: false, animation: "fade_from_bottom" }}
    />
  );
}
