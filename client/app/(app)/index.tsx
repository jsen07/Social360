import { Pressable, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { signOut } from "aws-amplify/auth";

export default function Page() {
  const router = useRouter();

  async function handleSignOut() {
    try {
      await signOut();
      console.log("You have been signed out.");
    } catch (error) {
      console.log("error signing out: ", error);
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-blue-300 items-center justify-center">
      <Text className="text-xl font-bold text-blue-500 mb-4">
        Welcome to Nativewind!
      </Text>

      <Pressable onPress={() => handleSignOut()}>
        <Text className="text-blue-700 mt-10">Logout</Text>
      </Pressable>
    </SafeAreaView>
  );
}
