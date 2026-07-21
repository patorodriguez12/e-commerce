import { createClient } from "@/lib/supabase/server";
import { formatPrice } from "@/lib/utils/formatPrice";
import { removeFromWishlist } from "@/lib/supabase/actions";
import ProductImage from "@/components/products/ProductImage";
import Link from "next/link";
import type { WishlistItem } from "@/types";

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
      <h1 className="text-[22px] font-medium tracking-[-0.5px] mb-6">
        My Wishlist
      </h1>

      {!items || items.length === 0 ? (
        <div className="text-center py-16 px-6 bg-surface border border-border rounded-xl">
          <p className="text-[28px] mb-3 text-gold opacity-50">◆</p>
          <p className="text-text-muted mb-5 text-sm">
            Your wishlist is empty
          </p>
          <Link
            href="/"
            className="bg-accent text-white px-6 py-[10px] rounded-lg no-underline text-sm font-medium transition-colors duration-150"
          >
            Browse products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-3">
          {items.map((item: WishlistItem) => (
            <div
              key={item.id}
              className="card-hover flex gap-[14px] bg-surface border border-border rounded-xl p-[14px]"
            >
              <Link href={`/products/${item.products?.slug}`}>
                <div className="relative w-[72px] h-[72px] shrink-0 rounded-lg overflow-hidden bg-bg-subtle">
                  <ProductImage
                    src={item.products?.image_url}
                    alt={item.products?.name ?? ""}
                    fill
                    sizes="72px"
                    className="object-cover"
                  />
                </div>
              </Link>

              <div className="flex-1 min-w-0 flex flex-col justify-between">
                <div className="min-w-0">
                  <Link
                    href={`/products/${item.products?.slug}`}
                    className="no-underline"
                  >
                    <p className="text-sm font-medium text-text truncate">
                      {item.products?.name}
                    </p>
                  </Link>
                  <p className="text-xs text-text-muted mt-0.5">
                    {item.products?.categories?.name}
                  </p>
                </div>

                <div className="flex items-center justify-between gap-2 mt-2">
                  <p className="text-sm font-semibold text-text">
                    {formatPrice(item.products?.price ?? 0)}
                  </p>
                  <div className="flex gap-[6px] items-center">
                    <Link
                      href={`/products/${item.products?.slug}`}
                      className="btn-ghost text-[11px] text-accent-text no-underline px-[10px] py-[5px] rounded-md border border-accent-border"
                    >
                      View
                    </Link>
                    <form
                      action={async () => {
                        "use server";
                        await removeFromWishlist(item.product_id);
                      }}
                    >
                      <button
                        type="submit"
                        className="btn-ghost-danger text-[11px] text-text-muted bg-transparent border border-border rounded-md px-[10px] py-[5px] cursor-pointer"
                      >
                        Remove
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
