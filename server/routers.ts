import { COOKIE_NAME } from "@shared/const";
import { TRPCError } from "@trpc/server";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { protectedProcedure, publicProcedure, router } from "./_core/trpc";
import { getEntitlementsForUser, getUserById, hasEntitlement } from "./db";
import { createPremiumCheckout, PREMIUM_UPGRADE_SKU } from "./stripe";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),
  payments: router({
    createCheckout: protectedProcedure.mutation(async ({ ctx }) => {
      const user = await getUserById(ctx.user.id);
      const email = user?.email ?? ctx.user.email;
      if (!email) {
        throw new TRPCError({ code: "PRECONDITION_FAILED", message: "A verified email is required before checkout." });
      }
      if (await hasEntitlement(ctx.user.id, PREMIUM_UPGRADE_SKU)) {
        return { alreadyOwned: true, url: null };
      }
      const origin = `${ctx.req.protocol}://${ctx.req.get("host")}`;
      return createPremiumCheckout({ userId: ctx.user.id, email, name: user?.name ?? ctx.user.name, origin });
    }),
    entitlements: protectedProcedure.query(({ ctx }) => getEntitlementsForUser(ctx.user.id)),
  }),
});

export type AppRouter = typeof appRouter;
