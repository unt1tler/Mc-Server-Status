import { supabase } from './supabase';

export async function isAdmin(): Promise<boolean> {
  const { data: { user } } = await supabase.auth.getUser();
  return user?.user_metadata?.is_admin === true;
}

export async function checkAdminAccess() {
  const isUserAdmin = await isAdmin();
  if (!isUserAdmin) {
    throw new Error('Unauthorized: Admin access required');
  }
}