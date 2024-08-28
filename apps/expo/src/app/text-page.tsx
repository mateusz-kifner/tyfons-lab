import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import { api } from "@/utils/api";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";

export default function Index() {
  return (
    <SafeAreaView className="bg-white">
      {/* Changes page title visible on the header */}
      <Stack.Screen options={{ title: "TestPage" }} />
      <View className="h-full w-full bg-red-500 p-4">
        <Button>
          <Text>TestPage</Text>
        </Button>
        <Text>Test</Text>
      </View>
    </SafeAreaView>
  );
}
