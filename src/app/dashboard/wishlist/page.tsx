import { createClient } from "@/lib/supabase/server";
import { formatPrice } from "@/lib/utils/formatPrice";
import { removeFromWishlist } from "@/lib/supabase/actions";
import Image from "next/image";
import Link from "next/link";

export default async function WishlistPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: items } = await supabase
    .from("wishlists")
    .select("*, products(*, categories(name))")
    .eq("user_id", user!.id)
    .order("created_at", { ascending: false });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">My Wishlist</h1>

      {!items || items.length === 0 ? (
        <div className="text-center py-16 text-gray-500">
          <p className="text-4xl mb-4">🤍</p>
          <p className="mb-4">Your wishlist is empty.</p>
          <Link
            href="/"
            className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors"
          >
            Browse products
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {items.map((item: any) => (
            <div
              key={item.id}
              className="flex items-center gap-4 border rounded-xl p-4"
            >
              <Link href={`/products/${item.products?.slug}`}>
                <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                  {item.products?.image_url && (
                    <Image
                      src={item.products.image_url}
                      alt={item.products.name}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>
              </Link>

              <div className="flex-1">
                <Link href={`/products/${item.products?.slug}`}>
                  <p className="font-medium hover:underline">
                    {item.products?.name}
                  </p>
                </Link>
                <p className="text-sm text-gray-500">
                  {item.products?.categories?.name}
                </p>
                <p className="font-bold mt-1">
                  {formatPrice(item.products?.price ?? 0)}
                </p>
              </div>

              <div className="flex flex-col gap-2 items-end">
                <Link
                  href={`/products/${item.products?.slug}`}
                  className="text-sm bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  View product
                </Link>
                <form
                  action={async () => {
                    "use server";
                    await removeFromWishlist(item.product_id);
                  }}
                >
                  <button
                    type="submit"
                    className="text-sm text-red-500 hover:text-red-700 transition-colors"
                  >
                    Remove
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
