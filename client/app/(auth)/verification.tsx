import { View, Text, TextInput, Pressable, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState, useEffect } from "react";
import { Keyboard, TouchableWithoutFeedback } from "react-native";
import { CodeField, Cursor } from "react-native-confirmation-code-field";
import { useRouter, useLocalSearchParams } from "expo-router";
import { confirmSignUp, resendSignUpCode } from "aws-amplify/auth";
import { ChevronLeft } from "lucide-react-native";

const verification = () => {
  const router = useRouter();
  const { email } = useLocalSearchParams<{ email: string }>();

  const [code, setCode] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [resendMessage, setResendMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  useEffect(() => {
    if (!email) {
      router.replace("/access");
    }
  }, [email]);

  if (!email) {
    return null;
  }

  const handleConfirm = async () => {
    try {
      setLoading(true);

      await confirmSignUp({
        username: email,
        confirmationCode: code,
      });

      setSuccessMessage(
        "Account verified successfully. You will be redirected shortly.",
      );

      setTimeout(() => {
        router.replace("/signin");
      }, 1500);
    } catch (error: any) {
      console.log(error.name, error.message);
      const errorName = error?.name;

      switch (errorName) {
        case "EmptyConfirmSignUpUsername":
          setError("An Email is required.");
          break;

        case "EmptyConfirmSignUpCode":
          setError("Please enter your verification code.");
          break;

        case "CodeMismatchException":
          setError("Invalid verification code. Please try again.");
          break;

        default:
          setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      await resendSignUpCode({
        username: email,
      });

      setResendMessage(
        "A new code has been sent. Please check your email again.",
      );
    } catch (error: any) {
      console.log(error);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView className="flex-1 bg-neutral-900 px-5">
        <View className="absolute top-[-120] right-[-100] w-[340] h-[340] rounded-full bg-white/5" />

        {/* Header */}
        <View className="pt-2">
          <Pressable
            onPress={() => router.back()}
            className="self-start flex-row items-center px-3 py-2 rounded-2xl bg-neutral-800 border border-neutral-700 active:opacity-70"
          >
            <ChevronLeft size={18} color="#a3a3a3" />

            <Text className="text-neutral-400 font-plexMedium ml-1 text-base">
              Back
            </Text>
          </Pressable>
        </View>

        {/* Content */}
        <View className="flex-1 justify-center">
          <View className="self-start px-3 py-1.5 rounded-full bg-neutral-800 border border-neutral-700 mb-6">
            <Text className="text-neutral-300 text-xs font-plexMedium tracking-wide">
              Email verification
            </Text>
          </View>

          {/* Heading */}
          <Text className="text-4xl text-white font-plexBold tracking-tight leading-tight">
            Verify your{"\n"}account.
          </Text>

          <Text className="text-neutral-400 text-base mt-4 leading-7 max-w-[320]">
            Enter the verification code sent to your email address.
          </Text>

          <View className="mt-10 gap-4">
            {/* <View
              className="
          bg-neutral-800/90
          border
          border-neutral-700
          rounded-2xl
          px-4
          h-14
          justify-center
        "
            >
              <TextInput
                placeholder="Email"
                placeholderTextColor="#737373"
                value={email}
                editable={false}
                selectTextOnFocus={false}
                autoCapitalize="none"
                className="text-neutral-400 text-base font-plexMedium"
              />
            </View> */}

            {/* verification code */}

            <CodeField
              value={code}
              onChangeText={(text) => {
                setCode(text);
                setError("");
                setResendMessage("");
              }}
              cellCount={6}
              keyboardType="number-pad"
              textContentType="oneTimeCode"
              autoComplete="sms-otp"
              renderCell={({ index, symbol, isFocused }) => (
                <View
                  key={index}
                  className={`w-12 h-14 rounded-2xl border items-center justify-center mx-1
                    ${
                      isFocused
                        ? "border-white bg-neutral-800"
                        : "border-neutral-700 bg-neutral-800"
                    }`}
                >
                  <Text className="text-white text-xl font-plexSemiBold">
                    {symbol || (isFocused ? <Cursor /> : "")}
                  </Text>
                </View>
              )}
            />
          </View>

          {/* Error */}
          {error ? (
            <Text className="text-red-400 text-sm mt-5 leading-5">{error}</Text>
          ) : null}

          {resendMessage ? (
            <Text className="text-red-400 text-sm mt-5 leading-5">
              {resendMessage}
            </Text>
          ) : null}

          {successMessage ? (
            <View className="mt-5 bg-green-500/10 border border-green-500/20 rounded-2xl p-4">
              <Text className="text-green-400 text-sm font-plexMedium">
                {successMessage}
              </Text>
            </View>
          ) : null}

          <Pressable
            onPress={handleConfirm}
            disabled={loading || !!successMessage}
            className={`
        h-14
        rounded-2xl
        bg-white
        items-center
        justify-center
        mt-8
        active:opacity-90
        ${loading ? "opacity-70" : ""}
      `}
          >
            <Text className="text-neutral-950 text-base font-plexBold">
              {loading ? "Verifying..." : "Verify Account"}
            </Text>
          </Pressable>

          {/* Resend */}
          <Pressable
            onPress={handleResend}
            className="items-center mt-6 active:opacity-70"
          >
            <Text className="text-neutral-400 text-sm font-plexMedium">
              Didn't receive a code?
            </Text>

            <Text className="text-blue-400 text-sm font-plexSemiBold mt-1">
              Resend Code
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default verification;
