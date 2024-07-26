export const testEvent = {
  onSubscribe: async () => {
    console.log("subscribed");
  },
  onUnsubscribe: async () => {
    console.log("unsubscribed");
  },
  emit: async () => {
    console.log("emit");
  },
  // getSession: publicProcedure.query(({ ctx }) => {
  //   return ctx.session;
  // }),
  // getSecretMessage: protectedProcedure.query(() => {
  //   return "you can see this secret message!";
  // }),
};
