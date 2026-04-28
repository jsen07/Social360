import { View, Text, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react'
import { useRouter } from "expo-router";

const signin = () => {
      const router = useRouter();
  return (
    <SafeAreaView>
      <Text>signin</Text>
          <Pressable onPress={() => router.back()}>
      <Text className="text-blue-500">Go Back</Text>
    </Pressable>
    </SafeAreaView>
  )
}

export default signin