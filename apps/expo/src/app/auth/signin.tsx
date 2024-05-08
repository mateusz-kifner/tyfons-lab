import { Button, SafeAreaView, Text, View } from "react-native";
import { Stack, useGlobalSearchParams } from "expo-router";

import { api } from "@/utils/api";
import { TextInput } from "react-native-gesture-handler";
import { useRef, useState } from "react";

export default function signin() {
  const usernameRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const [test, setTest] = useState("");
  return (
    <SafeAreaView className="bg-background">
      <Stack.Screen options={{ title: "Sign in" }} />
      <View className="flex h-full w-full flex-col p-4">
        <Text className="py-4 text-foreground">Username</Text>
        <TextInput
          ref={usernameRef}
          className="items-center rounded-md border border-input bg-background px-3 text-foreground text-lg leading-[1.25]"
        />
        <Text className="py-4 text-foreground">Password</Text>
        <TextInput
          ref={passwordRef}
          className="items-center rounded-md border border-input bg-background px-3 text-foreground text-lg leading-[1.25]"
        />
        <Button
          onPress={() => {
            setTest(`${usernameRef.current} ${passwordRef.current}`);
          }}
          title="Sign in"
        />
        <Text>{test}</Text>
      </View>
    </SafeAreaView>
  );
}
