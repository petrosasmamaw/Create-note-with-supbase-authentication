// src/supabaseClient.js
import { createClient } from "@supabase/supabase-js";

// Replace with your real Supabase project credentials:
const supabaseUrl = "https://kglcjnwsbpetasaiuykd.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtnbGNqbndzYnBldGFzYWl1eWtkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA0Mzc4ODAsImV4cCI6MjA3NjAxMzg4MH0.K1Ok6Ex_wYwIjcQ5HPIvWQUgcKqwSQxKQRq9an7sM_M";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
