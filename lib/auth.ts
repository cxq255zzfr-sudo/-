import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const COOKIE_NAME = 'fsnn_admin';

export async function isAdminLoggedIn(): Promise<boolean> {
  const store = await cookies();
  return store.get(COOKIE_NAME)?.value === 'ok';
}

export async function requireAdmin(): Promise<void> {
  const ok = await isAdminLoggedIn();
  if (!ok) redirect('/admin/login');
}

export function getAdminCredentials() {
  return {
    username: process.env.ADMIN_USER || 'admin',
    password: process.env.ADMIN_PASS || 'change-me'
  };
}

export { COOKIE_NAME };
