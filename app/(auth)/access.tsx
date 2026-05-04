import { Text, Pressable, View, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

type Option = {
  id: string;
  title: string;
  screen: "/signin" | "/signup";
};

const Access = () => {
  const router = useRouter();

  const options: Option[] = [
    {
      id: "1",
      title: "Sign In",
      screen: "/signin",
    },
    {
      id: "2",
      title: "Create an Account",
      screen: "/signup",
    },
  ];

  return (
    <SafeAreaView className="flex-1 items-center justify-end bg-neutral-800">
      <View className="w-full justify-center items-center">
        <Text className="text-white">Access</Text>
              <View className="w-full px-10 bg-blue-300">
        <FlatList
          data={options}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Pressable
              className="w-full flex justify-center items-center border rounded-3xl h-12 my-2"
              onPress={() => router.push(item.screen)}
            >
              <Text className="text-lg text-white">{item.title}</Text>
            </Pressable>
          )}
        />
      </View>
      </View>
    </SafeAreaView>
  );
};

export default Access;