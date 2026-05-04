import { View, Text, Pressable, TextInput, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { signUp } from "aws-amplify/auth";

const signup = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    try {
      setLoading(true);

      await signUp({
        username: email,
        password,
        options: {
          userAttributes: {
            email,
          },
        },
      });

      Alert.alert("Success", "Check your email for the verification code");

      router.push({
        pathname: "/verification",
        params: { email },
      });
    } catch (error: any) {
      if (error && error?.message.includes("User already exists")) {
        Alert.alert(
          "User already exists",
          "This email is already registered. Please log in.",
        );
        router.push("/signin");
      } else {
        console.log(error);
        Alert.alert("Signup failed", error.message || "Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="bg-neutral-800 flex-1 px-4">
      <Pressable onPress={() => router.back()}>
        <Text className="text-blue-500">Go Back</Text>
      </Pressable>

      <Text className="text-2xl text-white mt-4">Create an Account</Text>

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
          onPress={handleSignUp}
          className="bg-blue-500 p-3 rounded"
          disabled={loading}
        >
          <Text className="text-center text-white">
            {loading ? "Creating account..." : "Sign Up"}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default signup;
