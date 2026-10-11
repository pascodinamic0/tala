import Link from 'next/link';
import { CATEGORIES } from '@/lib/categories';

export function CategoryGrid() {
  return (
    <div className="grid grid-cols-4 gap-3 sm:grid-cols-4">
      {CATEGORIES.map((cat) => (
        <Link
          key={cat.slug}
          href={`/category/${cat.slug}`}
          className="flex flex-col items-center gap-1.5 rounded-2xl p-2 transition active:scale-95 hover:bg-surface-2"
        >
          <span
            className="flex h-14 w-14 items-center justify-center rounded-2xl text-2xl shadow-sm"
            style={{
              background: `linear-gradient(145deg, hsl(${cat.hue} 70% 94%), hsl(${cat.hue} 55% 82%))`,
            }}
            aria-hidden
          >
            {cat.emoji}
          </span>
          <span className="text-center text-[11px] font-medium leading-tight text-ink">
            {cat.short}
          </span>
        </Link>
      ))}
    </div>
  );
}
