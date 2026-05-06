import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";
import { getRequiredEnv, getSupabaseUrl } from "@/lib/env";

let adminClient: ReturnType<typeof createClient<Database>> | null = null;

export function getSupabaseAdmin() {
  if (!adminClient) {
    adminClient = createClient<Database>(
      getSupabaseUrl(),
      getRequiredEnv("SUPABASE_SERVICE_ROLE_KEY"),
      {
        auth: {
          persistSession: false
        }
      }
    );
  }
  return adminClient;
}
