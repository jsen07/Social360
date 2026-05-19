import { View, Text, TextInput, Pressable } from "react-native";
import { Keyboard, TouchableWithoutFeedback } from "react-native";
import { useRouter } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { SixoDispatch, RootState } from "@/store";
import { setFullname, setUserRole } from "@/store/onboardingSlice";

const UserDetails = () => {
  const router = useRouter();

  const dispatch = useDispatch<SixoDispatch>();
  const fullname = useSelector((state: RootState) => state.onboarding.fullname);
  const userRole = useSelector((state: RootState) => state.onboarding.userRole);

  const roleTypes = [
    "Owner",
    "General Manager",
    "Assistant Manager",
    "Operations Manager",
  ];
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View className="flex-1 bg-neutral-900 px-5">
        {/* Content */}
        <View className="gap-4 flex-1 justify-center">
          <Text className="text-white text-4xl font-plexBold leading-tight mt-4">
            Let’s personalize{"\n"}your workspace
          </Text>
          <Text className="text-neutral-400 text-sm leading-7">
            Your name will appear across schedules, shifts, and team management.
          </Text>
          {/* Fullname */}
          <Text className="text-neutral-400 text-base mt-4 leading-7">
            What is your fullname?
          </Text>
          <View className="bg-neutral-800 border border-neutral-700 rounded-2xl px-4 h-14 justify-center">
            <TextInput
              value={fullname}
              onChangeText={(text) => dispatch(setFullname(text))}
              placeholder="Fullname"
              placeholderTextColor="#737373"
              autoCapitalize="words"
              className="text-white text-base font-plexMedium"
            />
          </View>

          {/* Role */}
          <View className="gap-3">
            <Text className="text-neutral-400 text-sm font-plexMedium px-1">
              What is your Role?
            </Text>

            <View className="flex-row flex-wrap gap-3">
              {roleTypes.map((type) => {
                const selected = userRole === type;

                return (
                  <Pressable
                    key={type}
                    onPress={() => dispatch(setUserRole(type))}
                    className={`
                  px-4 h-11 rounded-2xl border items-center justify-center
                  ${
                    selected
                      ? "bg-white border-white"
                      : "bg-neutral-800 border-neutral-700"
                  }
                `}
                  >
                    <Text
                      className={`font-plexSemiBold ${
                        selected ? "text-neutral-950" : "text-white"
                      }`}
                    >
                      {type}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>
        </View>
        <View className="self-end-safe">
          <Pressable
            disabled={!fullname || !userRole}
            onPress={() => router.push("/(onboarding)/business-details")}
            className={`h-14 rounded-2xl items-center justify-center ${fullname && userRole ? "bg-blue-600" : "bg-neutral-700"}`}
          >
            <Text className="text-white text-base font-plexBold">Continue</Text>
          </Pressable>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default UserDetails;
