import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center px-4 text-center">
      <p className="text-5xl" aria-hidden>
        🔍
      </p>
      <h1 className="mt-3 font-display text-xl font-bold">Page introuvable</h1>
      <p className="mt-1 text-sm text-muted">Cette annonce ou page n’existe pas.</p>
      <Link
        href="/"
        className="mt-6 rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white"
      >
        Retour à l’accueil
      </Link>
    </main>
  );
}
