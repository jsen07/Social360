import { Text, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

const Access = () => {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-blue-300">
      <Text className="text-slate-500 mb-4">Access</Text>

      <Pressable onPress={() => router.push("/")}>
        <Text className="text-blue-500">Go to Home</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default Access;