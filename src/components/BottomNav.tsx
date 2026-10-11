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
      className="glass fixed inset-x-0 bottom-0 z-40 border-t border-line/70 pb-safe shadow-[0_-8px_30px_-18px_rgb(var(--shadow)/0.35)]"
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
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-brand to-brand-strong text-white shadow-lg shadow-brand/35 ring-4 ring-bg transition active:scale-95">
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
