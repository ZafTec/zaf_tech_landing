import { defineMiddleware } from "astro:middleware";
import { auth } from "@/lib/auth";

export const onRequest = defineMiddleware(async (context, next) => {
  try {
    const session = await auth.api.getSession({
      headers: context.request.headers,
    });
    if (session) {
      context.locals.user = session.user;
      context.locals.session = session.session;
    } else {
      context.locals.user = null;
      context.locals.session = null;
    }
  } catch (err) {
    console.error("[middleware] getSession failed:", err);
    context.locals.user = null;
    context.locals.session = null;
  }
  return next();
});
