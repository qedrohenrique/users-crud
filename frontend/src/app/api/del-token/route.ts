import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete("auth_token");

  return NextResponse.json({ message: "auth_token deleted" });
}
