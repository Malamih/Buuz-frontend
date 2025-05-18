import { NextRequest, NextResponse } from "next/server";
import { BASE_URL } from "./lib/apiClient";

export const middleware = async (request: NextRequest) => {
  const tokenCookie = request.cookies.get("token");
  const token = tokenCookie?.value;

  if (
    request.nextUrl.pathname.startsWith("/_next") ||
    request.nextUrl.pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  if (!token && request.nextUrl.pathname.includes("/dashboard")) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  try {
    const response = await fetch(`${BASE_URL}/admin/CheckAuth`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });
    const res = await response.json();
    if (
      request.nextUrl.pathname.includes("/auth") &&
      response.status != 401 &&
      response.status != 500
    ) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    if (res.statusCode == 500) {
      return NextResponse.redirect(new URL("/auth", request.url));
    }
    if (response.status != 401) {
      return NextResponse.next();
    }
  } catch (error) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }
  return NextResponse.next();
};

export const config = {
  matcher: ["/dashboard/:path*", "/auth/:path*"],
};
