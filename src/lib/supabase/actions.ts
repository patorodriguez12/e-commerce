"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import type { CartItem, CartItemInput, Product } from "@/types";

export async function login(formData: FormData) {
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function register(formData: FormData) {
  const supabase = await createClient();

  const { error } = await supabase.auth.signUp({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    options: {
      data: {
        full_name: formData.get("full_name") as string,
      },
    },
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/login");
}

export async function addToWishlist(productId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "Not authenticated" };

  const { error } = await supabase
    .from("wishlists")
    .insert({ user_id: user.id, product_id: productId });

  if (error) return { error: error.message };

  revalidatePath(`/products`);
  return { success: true };
}

export async function removeFromWishlist(productId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "Not authenticated" };

  const { error } = await supabase
    .from("wishlists")
    .delete()
    .eq("user_id", user.id)
    .eq("product_id", productId);

  if (error) return { error: error.message };

  revalidatePath(`/products`);
  return { success: true };
}

export async function submitReview(productId: string, formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "Not authenticated" };

  const rating = Number(formData.get("rating"));
  const comment = formData.get("comment") as string;

  if (!rating || rating < 1 || rating > 5) {
    return { error: "Please select a rating" };
  }

  const { error } = await supabase.from("reviews").upsert(
    {
      user_id: user.id,
      product_id: productId,
      rating,
      comment: comment || null,
    },
    {
      onConflict: "user_id,product_id",
    },
  );

  if (error) return { error: error.message };

  const { data: product } = await supabase
    .from("products")
    .select("slug")
    .eq("id", productId)
    .single();

  if (product?.slug) {
    revalidatePath(`/products/${product.slug}`);
  }

  return { success: true };
}

export async function syncCart(items: CartItemInput[]) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "Not authenticated" };

  if (items.length === 0) {
    const { error: deleteError } = await supabase
      .from("cart_items")
      .delete()
      .eq("user_id", user.id);
    if (deleteError) return { error: deleteError.message };
    return { success: true, items: [] };
  }

  // Fetch fresh stock from DB
  const adminSupabase = createAdminClient();
  const productIds = items.map((i) => i.product_id);
  const { data: products } = await adminSupabase
    .from("products")
    .select("id, stock")
    .in("id", productIds);

  if (!products) return { error: "Failed to fetch product stock" };

  const stockMap = new Map(products.map((p) => [p.id, p.stock]));

  // Cap quantities to available stock, remove items with 0 stock
  const correctedItems = items
    .map((i) => {
      const stock = stockMap.get(i.product_id) ?? 0;
      return { ...i, quantity: Math.min(i.quantity, stock) };
    })
    .filter((i) => i.quantity > 0);

  if (correctedItems.length === 0) {
    const { error: deleteError } = await supabase
      .from("cart_items")
      .delete()
      .eq("user_id", user.id);
    if (deleteError) return { error: deleteError.message };
    return { success: true, items: [] };
  }

  const { error } = await supabase.from("cart_items").upsert(
    correctedItems.map((i) => ({
      user_id: user.id,
      product_id: i.product_id,
      quantity: i.quantity,
    })),
    { onConflict: "user_id,product_id" },
  );

  if (error) return { error: error.message };
  return { success: true, items: correctedItems };
}

export async function getCart(): Promise<CartItem[]> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  const { data } = await supabase
    .from("cart_items")
    .select("product_id, quantity, products(*)")
    .eq("user_id", user.id);

  if (!data) return [];

  return data.map((item: Record<string, unknown>) => ({
    product: (item as { products: Product }).products,
    quantity: item.quantity as number,
  }));
}

export async function signInWithGoogle() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
    },
  });

  if (error) {
    console.error(error.message);
    return;
  }

  if (data.url) redirect(data.url);
}

export async function signInWithGitHub() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
    },
  });

  if (error) {
    console.error(error.message);
    return;
  }

  if (data.url) redirect(data.url);
}
