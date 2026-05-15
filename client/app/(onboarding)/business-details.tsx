import { View, Text, TextInput, Pressable } from "react-native";
import { Keyboard, TouchableWithoutFeedback } from "react-native";
import { useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import Animated from "react-native-reanimated";
import { usePressAnimation } from "@/animations/pressAnimation";
import { useDispatch, useSelector } from "react-redux";
import { SixoDispatch, RootState } from "@/store";
import {
  setBusinessName,
  setBusinessType,
  setNumberOfLocations,
} from "@/store/onboardingSlice";

const BusinessDetails = () => {
  const router = useRouter();

  const dispatch = useDispatch<SixoDispatch>();
  const businessName = useSelector(
    (state: RootState) => state.onboarding.businessName,
  );
  const businessType = useSelector(
    (state: RootState) => state.onboarding.businessType,
  );
  const locations = useSelector(
    (state: RootState) => state.onboarding.numberOfLocations,
  );

  const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
  const backAnimation = usePressAnimation();

  const businessTypes = ["Restaurant", "Cafe", "Bar", "Hotel", "Retail"];

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View className="flex-1 bg-neutral-900 px-5">
        <View className="flex-1">
          {/* Header */}
          <View className="flex-row items-center justify-between">
            <AnimatedPressable
              onPressIn={backAnimation.onPressIn}
              onPressOut={backAnimation.onPressOut}
              style={backAnimation.animatedStyle}
              onPress={() => router.back()}
              className="flex-row items-center active:opacity-70"
            >
              <ArrowLeft size={18} color="#a3a3a3" />
              <Text className="text-neutral-400 font-plexMedium ml-1 text-base">
                Previous
              </Text>
            </AnimatedPressable>
            <Text className=" self-end text-neutral-400 text-sm font-plexMedium mb-4 mt-4">
              Step 2 of 4
            </Text>
          </View>
          {/* Content */}
          <Text className="text-white text-4xl font-plexBold leading-tight mt-4">
            Tell us about your business
          </Text>
          <Text className="text-neutral-400 text-sm mt-4 leading-7">
            This helps us set up your workspace.
          </Text>
          <View className="mt-10 gap-4 flex-1">
            {/* Business Name */}
            <Text className="text-neutral-400 text-base mt-4 leading-7">
              What is the name of your business?
            </Text>
            <View className="bg-neutral-800 border border-neutral-700 rounded-2xl px-4 h-14 justify-center">
              <TextInput
                value={businessName}
                onChangeText={(text) => dispatch(setBusinessName(text))}
                placeholder="Business name"
                placeholderTextColor="#737373"
                className="text-white text-base font-plexMedium"
              />
            </View>

            {/* Business Type */}
            <View className="gap-3">
              <Text className="text-neutral-400 text-sm font-plexMedium px-1">
                Business type
              </Text>

              <View className="flex-row flex-wrap gap-3">
                {businessTypes.map((type) => {
                  const selected = businessType === type;

                  return (
                    <Pressable
                      key={type}
                      onPress={() => dispatch(setBusinessType(type))}
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

            {/* Number of Locations */}
            <Text className="text-neutral-400 text-base mt-4 leading-7">
              How many locations do you operate?
            </Text>
            <View className="bg-neutral-800 border border-neutral-700 rounded-2xl px-4 h-14 justify-center">
              <TextInput
                value={locations}
                onChangeText={(text) => dispatch(setNumberOfLocations(text))}
                placeholder="Number of locations (optional)"
                placeholderTextColor="#737373"
                keyboardType="number-pad"
                className="text-white text-base font-plexMedium"
              />
            </View>
          </View>
          <View className="self-end-safe">
            <Pressable
              disabled={!businessName || !businessType}
              onPress={() => router.push("/team-size")}
              className={`h-14 rounded-2xl items-center justify-center ${businessName && businessType ? "bg-blue-600" : "bg-neutral-700"}`}
            >
              <Text className="text-white text-base font-plexBold">
                Continue
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};
export default BusinessDetails;
