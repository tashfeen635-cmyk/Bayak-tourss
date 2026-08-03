import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const SECRET = new TextEncoder().encode(
  process.env.NEXTAUTH_SECRET || "bayak-tours-secret-change-in-production"
);

const PUBLIC_PATHS = ["/admin/login", "/api/auth"];

const PUBLIC_API_POST = [
  "/api/contact",
  "/api/bookings",
  "/api/custom-trips",
  "/api/testimonials",
];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (PUBLIC_PATHS.some((p) => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  if (request.method === "POST" && PUBLIC_API_POST.includes(pathname)) {
    return NextResponse.next();
  }

  if (
    request.method === "GET" &&
    pathname === "/api/testimonials" &&
    request.nextUrl.searchParams.get("status") === "approved"
  ) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/admin") || pathname.startsWith("/api")) {
    const token = request.cookies.get("bayak-admin-token")?.value;

    if (!token) {
      if (pathname.startsWith("/api/")) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    try {
      await jwtVerify(token, SECRET);
      return NextResponse.next();
    } catch {
      const response = pathname.startsWith("/api/")
        ? NextResponse.json({ error: "Invalid session" }, { status: 401 })
        : NextResponse.redirect(new URL("/admin/login", request.url));
      response.cookies.delete("bayak-admin-token");
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/:path*"],
};
