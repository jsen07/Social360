import { View, Text, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react'
import { useRouter } from "expo-router";

const signup = () => {
          const router = useRouter();
  return (
    <SafeAreaView className='bg-neutral-800 flex-1 px-4'>
                <Pressable onPress={() => router.back()}>
      <Text className="text-blue-500">Go Back</Text>
    </Pressable>
      <Text className='text-2xl'>Create an Account</Text>
    </SafeAreaView>
  )
}

export default signup