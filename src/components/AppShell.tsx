'use client';

import { usePathname } from 'next/navigation';
import { BottomNav } from './BottomNav';
import { Splash } from './Splash';

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideNav =
    pathname === '/demo' ||
    pathname.startsWith('/demo/') ||
    (pathname.startsWith('/chats/') && pathname !== '/chats');

  return (
    <>
      <Splash />
      <div className={hideNav ? '' : 'pb-24'}>{children}</div>
      {!hideNav && <BottomNav />}
    </>
  );
}
