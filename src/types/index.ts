export type Category = {
  id: string;
  name: string;
  slug: string;
  created_at: string;
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  stock: number;
  image_url: string | null;
  category_id: string | null;
  created_at: string;
  categories?: Category;
};

export type Profile = {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  address: string | null;
  phone: string | null;
  role: "customer" | "admin";
  updated_at: string;
};

export type OrderStatus =
  | "pending"
  | "paid"
  | "shipped"
  | "delivered"
  | "cancelled";

export type Order = {
  id: string;
  user_id: string;
  status: OrderStatus;
  total: number;
  stripe_session_id: string | null;
  created_at: string;
  order_items?: OrderItem[];
};

export type OrderItem = {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  unit_price: number;
  products?: Product;
};

// Cart type (only on client)
export type CartItem = {
  product: Product;
  quantity: number;
};

export type CartItemInput = {
  product_id: string;
  quantity: number;
};

export type WishlistItem = {
  id: string;
  user_id: string;
  product_id: string;
  created_at: string;
  products?: Product;
};

export type Review = {
  id: string;
  user_id: string;
  product_id: string;
  rating: number;
  comment: string | null;
  created_at: string;
  profiles?: Pick<Profile, "full_name">;
};
