import { View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { CircleSlash } from "lucide-react-native";
import { useAuth } from "@/hooks/useAuth";
import { SAVE_ONBOARDING_DETAILS } from "@/utils/mutations";
import { useMutation } from "@apollo/client";
import { useState, useEffect } from "react";
import SpinnerLoader from "@/components/LoadingAnimations.tsx/SpinningLoader";
import OnCompleteAnimation from "@/components/LoadingAnimations.tsx/OnCompleteAnimation";
import OnErrorAnimation from "@/components/LoadingAnimations.tsx/OnErrorAnimation";

const CreateWorkspace = () => {
  const router = useRouter();
  const { refreshProfile } = useAuth();
  const [loading, setLoading] = useState<boolean>(true);
  const [onComplete, setOnComplete] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const [saveOnboardingDetails] = useMutation(SAVE_ONBOARDING_DETAILS);

  const fullname = useSelector((state: RootState) => state.onboarding.fullname);
  const userRole = useSelector((state: RootState) => state.onboarding.userRole);
  const businessName = useSelector(
    (state: RootState) => state.onboarding.businessName,
  );
  const businessType = useSelector(
    (state: RootState) => state.onboarding.businessType,
  );
  const locations = useSelector(
    (state: RootState) => state.onboarding.numberOfLocations,
  );
  const teamSize = useSelector((state: RootState) => state.onboarding.teamSize);

  const handleCreateWorkspace = async () => {
    try {
      await saveOnboardingDetails({
        variables: {
          fullname,
          companyRole: userRole,
          companyName: businessName,
          businessType,
          numberOfLocations: locations ? parseInt(locations, 10) : null,
          employeeCountRange: teamSize,
        },
      });
      setTimeout(() => {
        setLoading(false);
        setOnComplete(true);

        setTimeout(async () => {
          await refreshProfile();
          router.replace("/(app)");
        }, 3800);
      }, 2000);
    } catch (error: any) {
      setTimeout(() => {
        setError(true);
        setLoading(false);
        setOnComplete(false);
        console.log(error);
      }, 2000);
    }
  };

  useEffect(() => {
    fullname && userRole && businessName && businessType && teamSize
      ? handleCreateWorkspace()
      : router.replace("/(onboarding)/user-details");
  }, []);

  // Test Animations

  // useEffect(() => {
  //   setTimeout(() => {
  //     setLoading(false);
  //     setOnComplete(true);

  //     setTimeout(async () => {
  //       setLoading(false);
  //       setOnComplete(false);
  //       setError(true);
  //     }, 3800);
  //   }, 2000);
  // }, []);

  return (
    <View className="flex-1 bg-neutral-900 px-5 justify-center items-center">
      {/* Content */}
      <View className="flex flex-col items-center">
        {loading && <SpinnerLoader />}
        {onComplete && <OnCompleteAnimation />}
        {error && <OnErrorAnimation />}

        {!error ? (
          <>
            {loading && (
              <>
                <Text className="text-white text-3xl font-plexBold leading-tight mt-10 text-center">
                  Creating your workspace
                </Text>
                <Text className="text-neutral-400 text-sm leading-7 mt-3 text-center">
                  Setting up your team, schedules, and workspace.
                </Text>
              </>
            )}

            {onComplete && (
              <>
                <Text className="text-white text-3xl font-plexBold leading-tight mt-10 text-center">
                  Workspace ready
                </Text>
                <Text className="text-neutral-400 text-sm leading-7 mt-3 text-center">
                  Preparing your dashboard...
                </Text>
              </>
            )}
          </>
        ) : (
          <>
            <Text className="text-white text-3xl font-plexBold leading-tight mt-10 text-center">
              We hit a problem while preparing your workspace
            </Text>

            <Text className="text-neutral-400 text-sm leading-7 mt-3 text-center">
              Please check your connection and try again.
            </Text>
          </>
        )}
      </View>
    </View>
  );
};

export default CreateWorkspace;
