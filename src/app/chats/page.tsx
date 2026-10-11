import Link from 'next/link';
import { Header } from '@/components/Header';
import { CHAT_THREADS } from '@/data/chats';
import { VerifiedBadge } from '@/components/VerifiedBadge';
import { MessageCircle } from 'lucide-react';

function relativeFr(iso: string) {
  const d = new Date(iso);
  return d.toLocaleString('fr-CD', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function ChatsPage() {
  return (
    <main>
      <Header showSearch={false} />
      <div className="px-4 pt-4">
        <h1 className="font-display text-xl font-bold">Messages</h1>
        <p className="mt-1 text-sm text-muted">
          Discutez avec les vendeurs — démo locale.
        </p>

        {CHAT_THREADS.length === 0 ? (
          <div className="mt-16 flex flex-col items-center text-center">
            <MessageCircle className="h-10 w-10 text-muted" />
            <p className="mt-3 font-semibold">Pas encore de conversation</p>
          </div>
        ) : (
          <ul className="mt-4 divide-y divide-line rounded-2xl border border-line bg-surface overflow-hidden">
            {CHAT_THREADS.map((t) => (
              <li key={t.id}>
                <Link
                  href={`/chats/${t.id}`}
                  className="flex items-start gap-3 px-4 py-3.5 transition hover:bg-surface-2"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-soft text-sm font-bold text-brand">
                    {t.peerName.slice(0, 1)}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <span className="truncate font-semibold text-sm">
                        {t.peerName}
                      </span>
                      {t.peerVerified && <VerifiedBadge />}
                    </div>
                    <p className="truncate text-xs text-muted">{t.listingTitle}</p>
                    <p className="mt-0.5 truncate text-sm text-ink/80">
                      {t.lastMessage}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <time className="text-[10px] text-muted whitespace-nowrap">
                      {relativeFr(t.updatedAt)}
                    </time>
                    {t.unread > 0 && (
                      <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-brand px-1.5 text-[10px] font-bold text-white">
                        {t.unread}
                      </span>
                    )}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
