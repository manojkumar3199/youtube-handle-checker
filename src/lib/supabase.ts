import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://jhtopyvwqjtreqmozuqi.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpodG9weXZ3cWp0cmVxbW96dXFpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE4MjYwNzMsImV4cCI6MjA3NzQwMjA3M30.yWcQEhhcTCyScqowalzI0MeOFbDV_p9E4Ds1PzrQM-0";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
