import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { getCategory } from '@/lib/categories';
import { listingsByCategory } from '@/data/listings';
import { ListingCard } from '@/components/ListingCard';

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cat = getCategory(slug);
  if (!cat) notFound();

  const items = listingsByCategory(slug);

  return (
    <main>
      <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-line bg-surface/95 px-3 py-3 backdrop-blur">
        <Link href="/" className="rounded-full p-2 hover:bg-surface-2" aria-label="Retour">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="font-semibold">
            {cat.emoji} {cat.label}
          </h1>
          <p className="text-xs text-muted">{cat.description}</p>
        </div>
      </header>

      <div className="px-4 pt-4 pb-4">
        <p className="mb-3 text-sm text-muted">
          {items.length} annonce{items.length > 1 ? 's' : ''}
        </p>
        {items.length === 0 ? (
          <p className="py-12 text-center text-sm text-muted">
            Pas encore d’annonces dans cette catégorie.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {items.map((l) => (
              <ListingCard key={l.id} listing={l} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
