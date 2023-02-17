export { default } from "next-auth/middleware";

export const config = {
  /** Block every page except images, api, favicon or login */
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|auth/login).*)"],
};
