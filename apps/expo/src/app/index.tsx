import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, Stack } from "expo-router";
import { api } from "@/utils/api";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";

export default function Index() {
  const utils = api.useUtils();

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
      </View>
    </SafeAreaView>
  );
}
