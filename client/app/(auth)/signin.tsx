import { View, Text, Pressable, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { signIn, getCurrentUser } from "aws-amplify/auth";

const signin = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    try {
      setLoading(true);

      const { isSignedIn, nextStep } = await signIn({
        username: email,
        password,
        options: {
          authFlowType: "USER_PASSWORD_AUTH",
        },
      });

      if (nextStep) {
        if (nextStep.signInStep === "CONFIRM_SIGN_UP") {
          router.push({
            pathname: "/verification",
            params: { email },
          });
        }
      }
    } catch (error: any) {
      alert(error?.message || "Failed to login");
    } finally {
      setLoading(false);
    }
  };
  return (
    <SafeAreaView>
      <Text>signin</Text>
      <Pressable onPress={() => router.push("/access")}>
        <Text className="text-blue-500">Go Back</Text>
      </Pressable>

      <View className="mt-6 space-y-4">
        <TextInput
          placeholder="Email"
          placeholderTextColor="#999"
          className="bg-neutral-700 p-3 rounded text-white"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />

        <TextInput
          placeholder="Password"
          placeholderTextColor="#999"
          className="bg-neutral-700 p-3 rounded text-white"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <Pressable
          onPress={handleLogin}
          className="bg-blue-500 p-3 rounded"
          disabled={loading}
        >
          <Text className="text-center text-white">
            {loading ? "Logging in..." : "Login"}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default signin;
