import { View, Text, Pressable } from "react-native";
import { WifiOff } from "lucide-react-native";
import { useAuth } from "@/hooks/useAuth";
import { router, useRouter } from "expo-router";
import { useEffect, useState } from "react";

const ServiceUnavailableScreen = () => {
  const router = useRouter();
  const { refreshProfile, loading } = useAuth();
  const [timer, setTimer] = useState<number>(5);
  const [reconnecting, setReconnecting] = useState<boolean>(false);

  const reconnect = async () => {
    setReconnecting(true);
    setInterval(() => {
      setTimeout(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }, 1000);
  };

  const refetch = async () => {
    const data = await refreshProfile();
  };
  useEffect(() => {
    if (timer === 0) {
      router.replace("/(app)");
    }
  }, [timer]);
  return (
    <View className="flex-1 bg-neutral-900 px-6 items-center justify-center">
      <View className="absolute top-[-120] left-[-80] w-[300] h-[300] rounded-full bg-blue-400/10" />
      <View className="absolute bottom-[-140] right-[-100] w-[280] h-[280] rounded-full bg-indigo-400/10" />

      <View className="w-20 h-20 rounded-3xl bg-neutral-800 border border-neutral-700 items-center justify-center mb-8">
        <WifiOff size={34} color="#d4d4d4" />
      </View>

      {/* Heading */}
      <Text className="text-white text-3xl font-plexBold text-center leading-tight">
        We couldn’t load {"\n"}your workspace.
      </Text>

      <Text className="text-neutral-400 text-base text-center leading-7 mt-5 max-w-[320]">
        Our services are temporarily unavailable. Please try again in a moment.
      </Text>

      {reconnecting && (
        <Text className="text-neutral-400 text-base text-center leading-7 mt-5 max-w-[320]">
          Attempting to reconnect in {timer}..
        </Text>
      )}

      <Pressable
        onPress={() => reconnect()}
        className="mt-10 h-14 px-8 rounded-2xl bg-white items-center justify-center active:opacity-80"
      >
        <Text className="text-neutral-950 text-base font-plexBold">
          Try Again
        </Text>
      </Pressable>
    </View>
  );
};

export default ServiceUnavailableScreen;
