'use client';

import { checkSession, getMe } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';
import { useEffect } from 'react';

interface Props {
  children: React.ReactNode;
}

export default function AuthProvider({ children }: Props) {
  const setUser = useAuthStore(state => state.setUser);
  const clearIsAuthenticated = useAuthStore(
    state => state.clearIsAuthenticated
  );

  useEffect(() => {
    async function fetchUser() {
      const isAuthenticate = await checkSession();

      if (isAuthenticate) {
        const user = await getMe();

        if (user) setUser(user);
      } else {
        clearIsAuthenticated();
      }
    }

    fetchUser();
  }, [setUser, clearIsAuthenticated]);
  return <>{children}</>;
}
