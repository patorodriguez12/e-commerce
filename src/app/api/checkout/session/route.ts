import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { CartItem } from "@/types";

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: "You must be logged in to checkout" },
        { status: 401 },
      );
    }

    const { items }: { items: CartItem[] } = await request.json();

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: "Your cart is empty" },
        { status: 400 },
      );
    }

    // Verificar stock actualizado desde la DB antes de cobrar
    const adminSupabase = createAdminClient();
    const productIds = items.map((i) => i.product.id);

    const { data: products } = await adminSupabase
      .from("products")
      .select("id, name, stock")
      .in("id", productIds);

    // Validar que cada item tenga stock suficiente
    for (const item of items) {
      const product = products?.find((p) => p.id === item.product.id);

      if (!product) {
        return NextResponse.json(
          { error: `Product "${item.product.name}" is no longer available` },
          { status: 400 },
        );
      }

      if (product.stock < item.quantity) {
        return NextResponse.json(
          {
            error: `Not enough stock for "${product.name}". Available: ${product.stock}`,
          },
          { status: 400 },
        );
      }
    }

    // Crear la sesión de Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: items.map(({ product, quantity }) => ({
        quantity,
        price_data: {
          currency: "usd",
          unit_amount: product.price,
          product_data: {
            name: product.name,
            description: product.description ?? undefined,
            images: product.image_url ? [product.image_url] : [],
          },
        },
      })),
      metadata: {
        user_id: user.id,
        items: JSON.stringify(
          items.map(({ product, quantity }) => ({
            product_id: product.id,
            quantity,
            unit_price: product.price,
          })),
        ),
      },
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Error creando sesión de Stripe:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
