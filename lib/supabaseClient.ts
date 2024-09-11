import { createClient } from "@supabase/supabase-js";

export const supabaseClient = async (supabaseToken: string) => {
  console.log("Supabase token:", supabaseToken);
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_KEY!,
    {
      global: {
        headers: {
          Authorization: `Bearer ${supabaseToken}`,
        },
      },
    }
  );
  return supabase;
};