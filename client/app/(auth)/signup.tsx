import { View, Text, Pressable, TextInput, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { signUp } from "aws-amplify/auth";
import { ChevronLeft, Eye, EyeOff } from "lucide-react-native";
import Animated from "react-native-reanimated";
import { usePressAnimation } from "@/animations/pressAnimation";
import { ActivityIndicator } from "react-native";
import { Keyboard, TouchableWithoutFeedback } from "react-native";

const signup = () => {
  const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

  const signupAnimation = usePressAnimation();
  const backAnimation = usePressAnimation();

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
      console.log(error.name, error.message);

      const errorName = error?.name;

      switch (errorName) {
        case "EmptySignUpUsername":
          setError("Please enter an email to create an account.");
          break;

        case "EmptySignUpPassword":
          setError("Please enter a password to create an account.");
          break;

        case "UsernameExistsException":
          setError("An account with this email already exists.");
          break;

        case "InvalidPasswordException":
          setError(
            error?.message || "Password does not meet the requirements.",
          );
          break;

        case "InvalidParameterException":
          setError("Please enter a valid email and password.");
          break;

        case "LimitExceededException":
          setError("Too many attempts. Please try again later.");
          break;

        case "NetworkError":
          setError("Network error. Please check your connection.");
          break;

        default:
          setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView className="flex-1 bg-neutral-900 px-5">
        {/* Background filler */}
        <View className="absolute top-[-120] right-[-100] w-[320] h-[320] rounded-full bg-blue-400/10" />

        {/* Header */}
        <View className="pt-2">
          <AnimatedPressable
            onPressIn={backAnimation.onPressIn}
            onPressOut={backAnimation.onPressOut}
            style={backAnimation.animatedStyle}
            onPress={() => router.back()}
            className="self-start flex-row items-center px-3 py-2 rounded-2xl bg-neutral-800 border border-neutral-700 active:opacity-70"
          >
            <ChevronLeft size={18} color="#a3a3a3" />
            <Text className="text-neutral-400 font-plexMedium ml-1 text-base">
              Back
            </Text>
          </AnimatedPressable>
        </View>

        {/* Content */}
        <View className="flex-1 justify-center">
          <View className="self-start px-3 py-1.5 rounded-full bg-neutral-800 border border-neutral-700 mb-6">
            <Text className="text-neutral-400 text-xs font-plexMedium tracking-wide">
              {" "}
              Create your Workspace{""}
            </Text>
          </View>
          <Text className="text-4xl text-white font-plexBold tracking-tight leading-tight">
            Start managing{"\n"}your team.
          </Text>

          <Text className="text-neutral-400 text-base mt-4 leading-7">
            Create an account to build rotas, track shifts, and organise your
            restaurant team.
          </Text>

          <View className="mt-10 gap-4">
            <View className="bg-neutral-800 border border-neutral-700 rounded-2xl px-4 h-14 justify-center">
              <TextInput
                placeholder="Email"
                placeholderTextColor="#737373"
                className="text-white text-base font-plexMedium"
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  setError("");
                }}
                autoCapitalize="none"
                keyboardType="email-address"
              />
            </View>

            <View className="bg-neutral-800 border border-neutral-700 rounded-2xl px-4 h-14 flex-row items-center">
              <TextInput
                placeholder="Password"
                placeholderTextColor="#737373"
                className="text-white text-base font-plexMedium flex-1"
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  setError("");
                }}
                secureTextEntry={!showPassword}
              />

              <Pressable
                onPress={() => setShowPassword((prev) => !prev)}
                hitSlop={10}
                className="pl-3"
              >
                {showPassword ? (
                  <EyeOff size={20} color="#a3a3a3" />
                ) : (
                  <Eye size={20} color="#a3a3a3" />
                )}
              </Pressable>
            </View>
          </View>
          <AnimatedPressable
            onPressIn={signupAnimation.onPressIn}
            onPressOut={signupAnimation.onPressOut}
            style={signupAnimation.animatedStyle}
            onPress={handleSignUp}
            disabled={loading}
            className={`
    h-14
    rounded-2xl
    bg-blue-400
    items-center
    justify-center
    mt-8
    active:opacity-90
    ${loading ? "opacity-70" : ""}
  `}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#0a0a0a" />
            ) : (
              <Text className="text-white text-base font-plexBold">
                Create Account
              </Text>
            )}
          </AnimatedPressable>

          {error ? (
            <Text className="text-red-500 text-sm mt-4">{error}</Text>
          ) : null}
        </View>
        {/* Footer */}
        <View className="flex-row justify-center mt-8 self-base">
          <Text className="text-neutral-500 text-sm">
            Already have an account?
          </Text>

          <Pressable onPress={() => router.push("/signin")}>
            <Text className="text-white text-sm font-plexSemiBold ml-1">
              Sign In
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default signup;
