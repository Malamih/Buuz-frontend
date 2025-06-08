import { NextRequest, NextResponse } from "next/server";
import { BASE_URL } from "./lib/apiClient";

export const middleware = async (request: NextRequest) => {
  const tokenCookie = request.cookies.get("token");
  const token = tokenCookie?.value;
  const path = request.nextUrl.pathname;
};

export const config = {
  matcher: ["/dashboard/:path*"],
};
