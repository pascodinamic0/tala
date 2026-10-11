'use client';

import { useEffect } from 'react';
import { registerSW } from '@/lib/install';
import { AppShell } from './AppShell';

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    registerSW();
  }, []);

  return <AppShell>{children}</AppShell>;
}
