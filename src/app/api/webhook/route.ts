import { Order } from "@/app/models/Order";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

// 🚨 REQUIRED for Stripe Webhooks to work
export const runtime = "nodejs";
export const preferredRegion = "auto";


export async function POST(req: NextRequest) {
  if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_SIGNING_SECRET) {
    return NextResponse.json(
      { error: "Stripe keys missing" },
      { status: 500 }
    );
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const endpointSecret = process.env.STRIPE_SIGNING_SECRET;

  const body = await req.text();
  const signature = req.headers.get("Stripe-Signature") || "";

  let event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, endpointSecret);
    console.log("🔥 WEBHOOK RECEIVED:", event.type);

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const orderId = session.metadata?.orderId;

      if (session.payment_status === "paid") {
        await Order.updateOne({ _id: orderId }, { paid: true });
        console.log("✅ ORDER UPDATED:", orderId);
      }
    }
  } catch (err: any) {
    console.log("❌ Webhook Error:", err.message);
    return NextResponse.json(
      { error: err.message },
      { status: 400 }
    );
  }

  return NextResponse.json({ received: true }, { status: 200 });
}
