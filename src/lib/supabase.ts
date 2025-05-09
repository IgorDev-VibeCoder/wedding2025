import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.SUPABASE_URL || "https://bedfmublpolopiyqmout.supabase.co"
const supabaseKey = process.env.SUPABASE_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJlZGZtdWJscG9sb3BpeXFtb3V0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NjgxNDE2OCwiZXhwIjoyMDYyMzkwMTY4fQ.HiBk7CJbUh4sN_tjfwiStsfI5WlYohGe5bWBx70JAio"
export const supabase = createClient(supabaseUrl, supabaseKey)