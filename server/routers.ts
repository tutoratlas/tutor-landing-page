import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { appendToGoogleSheet } from "./googleSheets";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // Form submission router
  form: router({
    submit: publicProcedure
      .input(
        z.object({
          name: z.string().min(1),
          whatsapp: z.string().optional(),
          email: z.string().email().optional(),
          telegram: z.string().optional(),
          teachingFormat: z.string().optional(),
          weeklyHours: z.string().optional(),
          commuteHours: z.string().optional(),
          biggestPain: z.string().optional(),
          subjects: z.string().optional(),
          optionalNotes: z.string().optional(),
          interviewOptIn: z.boolean(),
          willingnessToPayOptIn: z.boolean(),
          receiveUpdates: z.boolean(),
        })
      )
      .mutation(async ({ input }) => {
        // Validate at least one contact method
        if (!input.whatsapp && !input.email) {
          throw new Error('At least one contact method (WhatsApp or Email) is required');
        }

        const formData = {
          timestamp: new Date().toISOString(),
          name: input.name,
          whatsapp: input.whatsapp || '',
          email: input.email || '',
          telegram: input.telegram || '',
          teachingFormat: input.teachingFormat || '',
          weeklyHours: input.weeklyHours || '',
          commuteHours: input.commuteHours || '',
          biggestPain: input.biggestPain || '',
          subjects: input.subjects || '',
          optionalNotes: input.optionalNotes || '',
          interviewOptIn: input.interviewOptIn,
          willingnessToPayOptIn: input.willingnessToPayOptIn,
          receiveUpdates: input.receiveUpdates,
        };

        // Append to Google Sheets
        const success = await appendToGoogleSheet(formData);

        if (!success) {
          console.warn('[Form] Failed to append to Google Sheets, but continuing');
        }

        return {
          success: true,
          message: 'Form submitted successfully',
        };
      }),
  }),
});

export type AppRouter = typeof appRouter;
