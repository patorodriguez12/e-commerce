import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { logout } from "@/lib/supabase/actions";
import CartButton from "@/components/cart/CartButton";
import LogoutButton from "@/components/layout/LogoutButton";

export default async function Navbar() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <nav className="border-b px-4 py-3">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">
          MiTienda
        </Link>

        <div className="flex items-center gap-4">
          <CartButton />

          {user ? (
            <>
              <Link
                href="/dashboard"
                className="text-sm text-gray-600 hover:text-black"
              >
                Mi cuenta
              </Link>
              <LogoutButton />
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm text-gray-600 hover:text-black"
              >
                Ingresar
              </Link>
              <Link
                href="/register"
                className="text-sm bg-black text-white px-3 py-1.5 rounded-lg hover:bg-gray-800 transition-colors"
              >
                Registrarse
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
