import { View, Text, TextInput, Pressable, Alert } from "react-native";
import React, { useState } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import { confirmSignUp, resendSignUpCode } from "aws-amplify/auth";

const verification = () => {
  const router = useRouter();
  const { email } = useLocalSearchParams<{ email: string }>();

  const [code, setCode] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleConfirm = async () => {
    try {
      setLoading(true);

      await confirmSignUp({
        username: email,
        confirmationCode: code,
      });

      Alert.alert("Success", "Account verified! You can now sign in.");
      router.push("/signin");
    } catch (error: any) {
      Alert.alert("Error", error.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      await resendSignUpCode({
        username: email,
      });

      Alert.alert("Code sent", "Check your email again.");
    } catch (error: any) {
      console.log(error);
      Alert.alert("Error", error.message || "Could not resend code");
    }
  };

  return (
    <View className="flex-1 bg-neutral-800 px-6 justify-center">
      <Pressable onPress={() => router.back()}>
        <Text className="text-blue-500">Go Back</Text>
      </Pressable>

      <Text className="text-white text-2xl mb-6 text-center">
        Verify Your Account
      </Text>

      <TextInput
        placeholder="Email"
        placeholderTextColor="#999"
        value={email}
        editable={false}
        selectTextOnFocus={false}
        className="bg-neutral-700 text-white p-3 rounded mb-4"
        autoCapitalize="none"
      />

      <TextInput
        placeholder="Verification Code"
        placeholderTextColor="#999"
        value={code}
        onChangeText={setCode}
        className="bg-neutral-700 text-white p-3 rounded mb-4"
        keyboardType="number-pad"
      />

      <Pressable
        onPress={handleConfirm}
        className="bg-blue-500 p-3 rounded mb-4"
        disabled={loading}
      >
        <Text className="text-white text-center">
          {loading ? "Verifying..." : "Verify Account"}
        </Text>
      </Pressable>

      <Pressable onPress={handleResend}>
        <Text className="text-blue-400 text-center">Resend Code</Text>
      </Pressable>
    </View>
  );
};

export default verification;
