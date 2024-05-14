import { Button, SafeAreaView, Text, type TextInput, View } from "react-native";
import { Stack } from "expo-router";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import _ from "lodash";

export default function signin() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [test, setTest] = useState("");
  return (
    <SafeAreaView className="bg-background">
      <Stack.Screen options={{ title: "Sign in" }} />
      <View className="flex flex h-full w-full flex-col gap-2 p-4">
        <Input
          placeholder="Username"
          autoComplete="username"
          value={username}
          onChangeText={setUsername}
          className="items-center rounded-md border border-input bg-background px-3 text-foreground text-lg leading-[1.25]"
        />

        <Input
          autoComplete="password"
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          className="items-center rounded-md border border-input bg-background px-3 text-foreground text-lg leading-[1.25]"
        />
        <Button
          onPress={() => {
            setTest(`${username} ${password}`);
          }}
          title="Sign in"
        />
        <Text>{test}</Text>
      </View>
    </SafeAreaView>
  );
}
