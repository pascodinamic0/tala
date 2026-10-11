import Link from 'next/link';
import { Search, Bell } from 'lucide-react';
import { TalaLogo } from './TalaLogo';

export function Header({ showSearch = true }: { showSearch?: boolean }) {
  return (
    <header className="sticky top-0 z-30 border-b border-line/80 bg-surface/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-lg items-center gap-3 px-4 py-3">
        <Link href="/" className="shrink-0" aria-label="Tala — Accueil">
          <TalaLogo />
        </Link>
        {showSearch && (
          <Link
            href="/search"
            className="flex flex-1 items-center gap-2 rounded-full bg-surface-2 px-3.5 py-2.5 text-sm text-muted transition hover:bg-line/60"
          >
            <Search className="h-4 w-4 shrink-0" />
            <span className="truncate">Rechercher à Kinshasa…</span>
          </Link>
        )}
        <button
          type="button"
          className="rounded-full p-2 text-muted hover:bg-surface-2"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />
        </button>
      </div>
    </header>
  );
}
