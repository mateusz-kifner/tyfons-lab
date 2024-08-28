import type { TRPCRouterRecord } from "@trpc/server";
import { z } from "zod";

import { desc, eq } from "@tyfons-lab/db";
import { post } from "@tyfons-lab/db/schemas";

import { protectedProcedure, publicProcedure } from "../trpc";
import { CreatePostSchema } from "@tyfons-lab/db/validators";

export const postRouter = {
  all: publicProcedure.query(({ ctx }) => {
    // return ctx.db.select().from(schema.post).orderBy(desc(schema.post.id));
    return ctx.db.query.post.findMany({
      orderBy: desc(post.id),
      limit: 10,
    });
  }),

  byId: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      // return ctx.db
      //   .select()
      //   .from(schema.post)
      //   .where(eq(schema.post.id, input.id));

      return ctx.db.query.post.findFirst({
        where: eq(post.id, input.id),
      });
    }),

  create: protectedProcedure
    .input(CreatePostSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(post).values(input);
    }),

  delete: protectedProcedure.input(z.number()).mutation(({ ctx, input }) => {
    return ctx.db.delete(post).where(eq(post.id, input));
  }),
} satisfies TRPCRouterRecord;
