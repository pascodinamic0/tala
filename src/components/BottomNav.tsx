'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Heart, Home, MessageCircle, Menu, Plus } from 'lucide-react';
import { cn } from '@/lib/cn';

const items = [
  { href: '/', label: 'Accueil', icon: Home },
  { href: '/favorites', label: 'Favoris', icon: Heart },
  { href: '/post', label: 'Publier', icon: Plus, primary: true },
  { href: '/chats', label: 'Messages', icon: MessageCircle },
  { href: '/menu', label: 'Menu', icon: Menu },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 inset-x-0 z-40 border-t border-line bg-surface/95 backdrop-blur-md pb-[env(safe-area-inset-bottom)]"
      aria-label="Navigation principale"
    >
      <ul className="mx-auto flex max-w-lg items-end justify-around px-1 pt-1">
        {items.map((item) => {
          const active =
            item.href === '/'
              ? pathname === '/'
              : pathname.startsWith(item.href);
          const Icon = item.icon;
          if (item.primary) {
            return (
              <li key={item.href} className="-mt-5">
                <Link
                  href={item.href}
                  className="flex flex-col items-center gap-0.5"
                >
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand text-white shadow-lg shadow-brand/30 ring-4 ring-bg transition active:scale-95">
                    <Plus className="h-7 w-7" strokeWidth={2.5} />
                  </span>
                  <span className="text-[10px] font-semibold text-brand">
                    {item.label}
                  </span>
                </Link>
              </li>
            );
          }
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  'flex min-w-[64px] flex-col items-center gap-0.5 px-2 py-2 text-[10px] font-medium transition',
                  active ? 'text-brand' : 'text-muted',
                )}
              >
                <Icon
                  className={cn('h-5 w-5', active && 'stroke-[2.5]')}
                  fill={active && item.href === '/favorites' ? 'currentColor' : 'none'}
                />
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
