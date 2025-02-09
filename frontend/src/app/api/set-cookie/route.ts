import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { token } = await req.json();
  console.log("DSADS")
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
    maxAge: 60 * 60 * 24 * 7, // 1 week
  });

  return response;
}
