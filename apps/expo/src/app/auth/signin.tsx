import { Button, SafeAreaView, Text, type TextInput, View } from "react-native";
import { Stack } from "expo-router";
import { Input } from "@/components/ui/input";
import { useRef, useState } from "react";

export default function signin() {
  const usernameRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const [test, setTest] = useState("");
  return (
    <SafeAreaView className="bg-background">
      <Stack.Screen options={{ title: "Sign in" }} />
      <View className="flex flex h-full w-full flex-col gap-2 p-4">
        <Input
          ref={usernameRef}
          placeholder="Username"
          className="items-center rounded-md border border-input bg-background px-3 text-foreground text-lg leading-[1.25]"
        />

        <Input
          ref={passwordRef}
          autoComplete="password"
          placeholder="Password"
          secureTextEntry
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
