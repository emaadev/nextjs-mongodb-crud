import { connectDB } from "@/utils/mongodb";
import { NextResponse } from "next/server";

export function GET() {
  connectDB();
  return NextResponse.json({ message: "Hello world" });
}
