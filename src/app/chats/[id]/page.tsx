'use client';

import { use, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Send } from 'lucide-react';
import { CHAT_MESSAGES, CHAT_THREADS } from '@/data/chats';
import { VerifiedBadge } from '@/components/VerifiedBadge';
import { cn } from '@/lib/cn';

export default function ChatThreadPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const thread = CHAT_THREADS.find((t) => t.id === id);
  const seed = CHAT_MESSAGES[id] ?? [];
  const [messages, setMessages] = useState(seed);
  const [text, setText] = useState('');

  if (!thread) {
    return (
      <main className="px-4 pt-8">
        <p>Conversation introuvable.</p>
        <Link href="/chats" className="text-brand font-semibold">
          Retour
        </Link>
      </main>
    );
  }

  function send(e: React.FormEvent) {
    e.preventDefault();
    const t = text.trim();
    if (!t) return;
    setMessages((prev) => [
      ...prev,
      {
        id: `local-${Date.now()}`,
        threadId: id,
        from: 'me',
        text: t,
        createdAt: new Date().toISOString(),
      },
    ]);
    setText('');
  }

  return (
    <main className="flex h-dvh flex-col bg-bg">
      <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-line bg-surface/95 px-3 py-3 backdrop-blur">
        <Link
          href="/chats"
          className="rounded-full p-2 hover:bg-surface-2"
          aria-label="Retour"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <h1 className="truncate font-semibold">{thread.peerName}</h1>
            {thread.peerVerified && <VerifiedBadge />}
          </div>
          <Link
            href={`/listing/${thread.listingId}`}
            className="truncate text-xs text-muted hover:text-brand"
          >
            {thread.listingTitle}
          </Link>
        </div>
      </header>

      <div className="flex-1 space-y-2 overflow-y-auto px-4 py-4">
        {messages.map((m) => (
          <div
            key={m.id}
            className={cn(
              'flex',
              m.from === 'me' ? 'justify-end' : 'justify-start',
            )}
          >
            <div
              className={cn(
                'max-w-[80%] rounded-2xl px-3.5 py-2 text-sm leading-relaxed',
                m.from === 'me'
                  ? 'rounded-br-md bg-brand text-white'
                  : 'rounded-bl-md bg-surface border border-line text-ink',
              )}
            >
              {m.text}
            </div>
          </div>
        ))}
      </div>

      <form
        onSubmit={send}
        className="border-t border-line bg-surface px-3 py-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]"
      >
        <div className="flex items-center gap-2">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Écrire un message…"
            className="flex-1 rounded-full border border-line bg-bg px-4 py-2.5 text-sm outline-none focus:border-brand"
          />
          <button
            type="submit"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-brand text-white disabled:opacity-40"
            disabled={!text.trim()}
            aria-label="Envoyer"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </form>
    </main>
  );
}
