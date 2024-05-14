import { Button, SafeAreaView, Text, View } from "react-native";
import { Stack } from "expo-router";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import _ from "lodash";

export default function SignInMagicLink() {
  const [email, setEmail] = useState<string>("");
  const [test, setTest] = useState("");
  return (
    <SafeAreaView className="bg-background">
      <Stack.Screen options={{ title: "Sign in" }} />
      <View className="flex flex h-full w-full flex-col gap-2 p-4">
        <Input
          placeholder="E-mail"
          autoComplete="email"
          value={email}
          onChangeText={setEmail}
          className="items-center rounded-md border border-input bg-background px-3 text-foreground text-lg leading-[1.25]"
        />

        <Button
          onPress={() => {
            setTest(`${email}`);
          }}
          title="Sign in"
        />
        <Text>{test}</Text>
      </View>
    </SafeAreaView>
  );
}
