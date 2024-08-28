import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, Stack } from "expo-router";
import { api } from "@/utils/api";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { useContext } from "react";
import { WebSocketsContext } from "@/utils/wsClient";

export default function Index() {
  const utils = api.useUtils();
  const wsContext = useContext(WebSocketsContext);

  return (
    <SafeAreaView className="bg-white">
      {/* Changes page title visible on the header */}
      {/* <Stack.Screen options={{ title: "Home Page" }}  /> */}
      <View className="h-full w-full bg-background p-4">
        <Link
          asChild
          href={{
            pathname: "/auth/sign-in-magic-link",
          }}
        >
          <Button>
            <Text>Sign In</Text>
          </Button>
        </Link>
        <Button
          onPress={() => {
            wsContext?.sendMessage("test");
          }}
        >
          <Text>send message</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
}
