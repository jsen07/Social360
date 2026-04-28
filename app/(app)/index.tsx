import { Pressable, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import "../../global.css";

export default function Page() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-blue-300 items-center justify-center">
      <Text className="text-xl font-bold text-blue-500 mb-4">
        Welcome to Nativewind!
      </Text>

      <Pressable onPress={() => router.push("/access")}>
        <Text className="text-blue-700">Go to Access</Text>
      </Pressable>
    </SafeAreaView>
  );
}
