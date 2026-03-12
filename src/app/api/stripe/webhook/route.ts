import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createAdminClient } from "@/lib/supabase/admin";
import Stripe from "stripe";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature")!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch (error) {
    console.error("Webhook signature inválida:", error);
    return NextResponse.json({ error: "Webhook inválido" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    const userId = session.metadata?.user_id;
    const rawItems = session.metadata?.items;

    if (!userId || !rawItems) {
      return NextResponse.json(
        { error: "Metadata incompleta" },
        { status: 400 },
      );
    }

    const items = JSON.parse(rawItems) as {
      product_id: string;
      quantity: number;
      unit_price: number;
    }[];

    const total = items.reduce(
      (acc, item) => acc + item.unit_price * item.quantity,
      0,
    );

    const supabase = createAdminClient();

    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        user_id: userId,
        status: "paid",
        total,
        stripe_session_id: session.id,
      })
      .select()
      .single();

    if (orderError) {
      console.error("Error creando orden:", orderError);
      return NextResponse.json(
        { error: "Error guardando orden" },
        { status: 500 },
      );
    }

    const { error: itemsError } = await supabase.from("order_items").insert(
      items.map((item) => ({
        order_id: order.id,
        product_id: item.product_id,
        quantity: item.quantity,
        unit_price: item.unit_price,
      })),
    );

    if (itemsError) {
      console.error("Error guardando items:", itemsError);
      return NextResponse.json(
        { error: "Error guardando items" },
        { status: 500 },
      );
    }
  }

  return NextResponse.json({ received: true });
}
