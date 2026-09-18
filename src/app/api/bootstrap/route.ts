import { NextResponse } from "next/server";
import { seedOrders, seedProducts, seedUsers } from "@/lib/seed";

/** Mock REST endpoint used by the first functional delivery.
 * The client keeps demo changes in localStorage so the project runs on Vercel
 * without exposing credentials. This endpoint can later be replaced by Firebase.
 */
export async function GET() {
  return NextResponse.json({ users: seedUsers, products: seedProducts, orders: seedOrders });
}
