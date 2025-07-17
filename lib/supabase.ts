import { createClient } from "@supabase/supabase-js";

const supabaseURL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// if (!supabaseURL || !supabaseKey) {
//   console.error("Supabase URL or API key is missing!");
// }
// console.log("SK",supabaseKey)

export const supabase = createClient(supabaseURL, supabaseKey)