import { createClient } from "@/lib/supabase/client";

export async function uploadProductImage(file: File): Promise<string> {
  const supabase = createClient();
  const ext = file.name.split(".").pop();
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

  const { error } = await supabase.storage
    .from("products")
    .upload(filename, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) throw new Error(error.message);

  const { data } = supabase.storage.from("products").getPublicUrl(filename);

  return data.publicUrl;
}

export async function deleteProductImage(url: string): Promise<void> {
  const supabase = createClient();

  const filename = url.split("/").pop();
  if (!filename) return;

  await supabase.storage.from("products").remove([filename]);
}
