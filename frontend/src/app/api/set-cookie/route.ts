import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { token } = await req.json();

  if (!token) {
    return NextResponse.json({ error: "Token not provided" }, { status: 400 });
  }

  const response = NextResponse.json({ message: "Token set" });

  response.cookies.set({
    name: "auth_token",
    value: token,
    httpOnly: true, 
    secure: process.env.NODE_ENV === "production", 
    sameSite: "strict", 
    path: "/",
    maxAge: 60 * 60, // 1 hour
  });

  return response;
}
