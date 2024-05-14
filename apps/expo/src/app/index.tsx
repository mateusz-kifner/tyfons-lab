import { useState } from "react";
import { Pressable, TextInput, View } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { Link, Stack } from "expo-router";
import { FlashList } from "@shopify/flash-list";

import type { RouterOutputs } from "@/utils/api";
import { api } from "@/utils/api";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";

// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectLabel,
//   SelectTrigger,
//   SelectValue,
// } from "@tyfons-lab/ui-native/ui/select";

function PostCard(props: {
  post: RouterOutputs["post"]["all"][number];
  onDelete: () => void;
}) {
  return (
    <View className="flex flex-row rounded-lg bg-muted p-4">
      <View className="flex-grow">
        <Link
          asChild
          href={{
            pathname: "/post/[id]",
            params: { id: props.post.id },
          }}
        >
          <Pressable className="">
            <Text className="font-semibold text-primary text-xl">
              {props.post.title}
            </Text>
            <Text className="mt-2 text-foreground">{props.post.content}</Text>
          </Pressable>
        </Link>
      </View>
      <Pressable onPress={props.onDelete}>
        <Text className="font-bold text-primary uppercase">Delete</Text>
      </Pressable>
    </View>
  );
}

function CreatePost() {
  const utils = api.useUtils();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const { mutate, error } = api.post.create.useMutation({
    async onSuccess() {
      setTitle("");
      setContent("");
      await utils.post.all.invalidate();
    },
  });

  return (
    <View className="mt-4 flex gap-2">
      <TextInput
        className="items-center rounded-md border border-input bg-background px-3 text-foreground text-lg leading-[1.25]"
        value={title}
        onChangeText={setTitle}
        placeholder="Title"
      />
      {error?.data?.zodError?.fieldErrors.title && (
        <Text className="mb-2 text-destructive">
          {error.data.zodError.fieldErrors.title}
        </Text>
      )}
      <TextInput
        className="items-center rounded-md border border-input bg-background px-3 text-foreground text-lg leading-[1.25]"
        value={content}
        onChangeText={setContent}
        placeholder="Content"
      />
      {error?.data?.zodError?.fieldErrors.content && (
        <Text className="mb-2 text-destructive">
          {error.data.zodError.fieldErrors.content}
        </Text>
      )}
      <Pressable
        className="flex items-center rounded bg-primary p-2"
        onPress={() => {
          mutate({
            title,
            content,
          });
        }}
      >
        <Text className="text-foreground">Create</Text>
      </Pressable>
      {error?.data?.code === "UNAUTHORIZED" && (
        <Text className="mt-2 text-destructive">
          You need to be logged in to create a post
        </Text>
      )}
    </View>
  );
}

export default function Index() {
  const utils = api.useUtils();

  const postQuery = api.post.all.useQuery();

  const deletePostMutation = api.post.delete.useMutation({
    onSettled: () => utils.post.all.invalidate().then(),
  });

  const insets = useSafeAreaInsets();
  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: 12,
    right: 12,
  };

  return (
    <SafeAreaView className="bg-background">
      {/* Changes page title visible on the header */}
      <Stack.Screen options={{ title: "Home Page" }} />
      <View className="h-full w-full bg-background p-4">
        <Text className="pb-2 text-center font-bold text-5xl text-foreground">
          Create <Text className="text-primary">T3</Text> Turbo
        </Text>

        <Pressable
          onPress={() => void utils.post.all.invalidate()}
          className="flex items-center rounded-lg bg-primary p-2"
        >
          <Text className="text-foreground"> Refresh posts</Text>
        </Pressable>

        <View className="py-2">
          <Text className="font-semibold text-primary italic">
            Press on a post
          </Text>
        </View>

        <FlashList
          data={postQuery.data}
          estimatedItemSize={20}
          ItemSeparatorComponent={() => <View className="h-2" />}
          renderItem={(p) => (
            <PostCard
              post={p.item}
              onDelete={() => deletePostMutation.mutate(p.item.id)}
            />
          )}
        />
        <Button onPress={() => console.log("Test")}>
          <Text>Test</Text>
        </Button>
        {/* <Select defaultValue={{ value: "apple", label: "Apple" }}>
          <SelectTrigger className="w-[250px]">
            <SelectValue
              className="text-foreground text-sm native:text-lg"
              placeholder="Select a fruit"
            />
          </SelectTrigger>
          <SelectContent insets={contentInsets} className="w-[250px]">
            <SelectGroup>
              <SelectLabel>Fruits</SelectLabel>
              <SelectItem label="Apple" value="apple">
                Apple
              </SelectItem>
              <SelectItem label="Banana" value="banana">
                Banana
              </SelectItem>
              <SelectItem label="Blueberry" value="blueberry">
                Blueberry
              </SelectItem>
              <SelectItem label="Grapes" value="grapes">
                Grapes
              </SelectItem>
              <SelectItem label="Pineapple" value="pineapple">
                Pineapple
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select> */}

        <CreatePost />
      </View>
    </SafeAreaView>
  );
}
