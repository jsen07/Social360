import { View, Text, Pressable, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { getCurrentUser, signIn } from "aws-amplify/auth";
import { CREATE_USER } from "../../utils/mutations";
import { ActivityIndicator } from "react-native";
import Animated from "react-native-reanimated";
import { usePressAnimation } from "@/animations/pressAnimation";
import { ChevronLeft, Eye, EyeOff } from "lucide-react-native";
import { Keyboard, TouchableWithoutFeedback } from "react-native";
import { useMutation } from "@apollo/client";

const signin = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
  const [createUser] = useMutation(CREATE_USER);

  const signinAnimation = usePressAnimation();
  const backAnimation = usePressAnimation();

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please enter an email and password.");
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

      if (isSignedIn) {
        const currentUser = await getCurrentUser();
        await createUser({
          variables: {
            email,
            cognitoSub: currentUser.userId,
          },
        });
      }

      if (nextStep) {
        if (nextStep.signInStep === "CONFIRM_SIGN_UP") {
          router.push({
            pathname: "/verification",
            params: { email },
          });
        }
      }
    } catch (error: any) {
      console.log(error.name, error.message);

      const errorName = error?.name;
      switch (errorName) {
        case "NotAuthorizedException":
          setError("Incorrect email or password.");
          break;

        case "InvalidPasswordException":
          setError("Incorrect email or password.");
          break;

        case "TooManyRequestsException":
          setError("Too many requests. Please try again later.");
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
        <View className="absolute top-[-120] left-[-80] w-[320] h-[320] rounded-full bg-blue-400/10" />
        {/* Header */}
        <View className="pt-2">
          <AnimatedPressable
            onPressIn={backAnimation.onPressIn}
            onPressOut={backAnimation.onPressOut}
            style={backAnimation.animatedStyle}
            onPress={() => router.replace("/access")}
            className="self-start flex-row items-center px-3 py-2 rounded-2xl bg-neutral-800/60 border border-neutral-700/60 active:opacity-70"
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
            <Text className="text-neutral-300 text-xs font-plexMedium tracking-wide">
              {" "}
              Workforce Management
            </Text>
          </View>

          <Text className="text-4xl text-white font-plexBold tracking-tight leading-tight">
            Sign in to your{"\n"}account.
          </Text>
          <Text className="text-neutral-400 text-base mt-4 leading-7 max-w-[320]">
            Continue managing schedules, staff, and shifts from one place.
          </Text>

          <View className="mt-10 gap-4">
            <View className="bg-neutral-800 border border-neutral-700 rounded-2xl px-4 h-14 justify-center">
              <TextInput
                placeholder="Email"
                placeholderTextColor="#737373"
                className="text-white text-base font-plexMedium flex-1"
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  setError("");
                }}
                autoCapitalize="none"
                keyboardType="email-address"
                autoComplete="email"
                textContentType="emailAddress"
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
                autoComplete="password"
                textContentType="password"
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
          <View className="flex-row items-center w-full py-2">
            <View className="flex-1">
              {error ? (
                <Text className="text-red-500 text-sm px-1">{error}</Text>
              ) : null}
            </View>

            <Pressable>
              <Text className="text-neutral-500 text-sm">Forgot password?</Text>
            </Pressable>
          </View>

          <AnimatedPressable
            onPressIn={signinAnimation.onPressIn}
            onPressOut={signinAnimation.onPressOut}
            style={signinAnimation.animatedStyle}
            onPress={handleLogin}
            className={`
            h-14 rounded-2xl bg-blue-500 items-center justify-center mt-8 active:opacity-90
            ${loading ? "opacity-70" : ""}`}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#0a0a0a" />
            ) : (
              <Text className="text-white text-base font-plexBold">Login</Text>
            )}
          </AnimatedPressable>
        </View>

        <View className="flex-row justify-center mt-8 self-base">
          <Text className="text-neutral-500 text-sm">
            Don't have an account?
          </Text>

          <Pressable onPress={() => router.push("/signup")}>
            <Text className="text-white text-sm font-plexSemiBold ml-1">
              Sign up
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default signin;
