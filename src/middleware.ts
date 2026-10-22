// src/middleware.ts
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const token = req.nextauth.token;

    // Handle root /dashboard redirect to user's personalized dashboard
    if (pathname === "/dashboard" || pathname === "/dashboard/") {
      if (token?.username) {
        return NextResponse.redirect(new URL(`/dashboard/${token.username}`, req.url));
      }
      return NextResponse.redirect(new URL("/", req.url));
    }

    // Protect against unauthorized user/repo path access:
    // If a user tries to access /dashboard/otherUser or /dashboard/otherUser/repo,
    // redirect them to their own authorized dashboard.
    if (pathname.startsWith("/dashboard/")) {
      const parts = pathname.split("/").filter(Boolean); // ["dashboard", "username", "repo"?]
      const targetUser = parts[1];

      if (
        targetUser &&
        token?.username &&
        targetUser.toLowerCase() !== (token.username as string).toLowerCase()
      ) {
        // Redirect to user's own dashboard or same repo under their own account
        const redirectedPath = parts.length > 2
          ? `/dashboard/${token.username}/${parts[2]}`
          : `/dashboard/${token.username}`;
        return NextResponse.redirect(new URL(redirectedPath, req.url));
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        // Enforce that a valid token must exist with an active accessToken and username
        return !!token && !!token.accessToken && !!token.username;
      },
    },
    pages: {
      signIn: "/",
    },
  }
);

export const config = {
  matcher: [
    "/dashboard",
    "/dashboard/:path*",
    "/api/github/:path*",
    "/api/firebase/:path*",
    "/api/users/:path*",
  ],
};


