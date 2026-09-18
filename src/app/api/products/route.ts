import { NextRequest, NextResponse } from "next/server";
import { seedProducts } from "@/lib/seed";

export async function GET() { return NextResponse.json(seedProducts); }
export async function POST(request: NextRequest) {
  const body = await request.json();
  if (!body.name || Number(body.price) <= 0) return NextResponse.json({ error: "Nombre y precio son obligatorios." }, { status: 400 });
  return NextResponse.json({ ...body, id: `p-${Date.now()}` }, { status: 201 });
}
