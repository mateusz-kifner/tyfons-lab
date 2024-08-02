import {
  broadcastMessage,
  peerMessage,
  router,
  serverMessage,
} from "@/wrpc/initWRPC";

export const testEvent = router(
  {
    helloServer: serverMessage.emit(async () => {
      console.log("emit serverMessage");
    }),
    helloPeer: peerMessage.emit(async (userId: string) => {
      console.log("emit peerMessage", userId);
    }),
    helloBroadcast: broadcastMessage.emit(async () => {
      console.log("emit broadcastMessage");
    }),
  },
  {
    onSubscribe: async () => {
      console.log("subscribed");
    },
    onUnsubscribe: async () => {
      console.log("unsubscribed");
    },
  },
);
