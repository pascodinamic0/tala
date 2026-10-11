'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/Header';
import { CATEGORIES } from '@/lib/categories';
import { COMMUNES } from '@/lib/communes';
import { deleteDraft, listDrafts, saveDraft } from '@/lib/db';
import type { Currency, DraftAd, CategorySlug } from '@/lib/types';
import { Trash2 } from 'lucide-react';

const empty: Omit<DraftAd, 'id' | 'updatedAt'> = {
  title: '',
  category: '',
  price: null,
  currency: 'USD',
  commune: 'Gombe',
  description: '',
};

export default function PostPage() {
  const router = useRouter();
  const [form, setForm] = useState(empty);
  const [drafts, setDrafts] = useState<DraftAd[]>([]);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    listDrafts().then(setDrafts);
  }, []);

  async function onSaveDraft() {
    const id = `d-${Date.now()}`;
    const draft: DraftAd = {
      id,
      ...form,
      updatedAt: new Date().toISOString(),
    };
    await saveDraft(draft);
    setDrafts(await listDrafts());
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  async function onPublish(e: React.FormEvent) {
    e.preventDefault();
    await onSaveDraft();
    router.push('/boost?from=post');
  }

  return (
    <main>
      <Header showSearch={false} />
      <div className="px-4 pt-4 pb-8">
        <h1 className="font-display text-xl font-bold">Publier une annonce</h1>
        <p className="mt-1 text-sm text-muted">
          Gratuit. Ensuite vous pourrez booster (démo) — jamais de % sur la vente.
        </p>

        <form onSubmit={onPublish} className="mt-5 space-y-4">
          <label className="block text-sm">
            <span className="mb-1 block font-medium">Titre</span>
            <input
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Ex. : Villa 4 chambres Ngaliema"
              className="w-full rounded-xl border border-line bg-surface px-3 py-2.5 outline-none focus:border-brand"
            />
          </label>

          <label className="block text-sm">
            <span className="mb-1 block font-medium">Catégorie</span>
            <select
              required
              value={form.category}
              onChange={(e) =>
                setForm({ ...form, category: e.target.value as CategorySlug | '' })
              }
              className="w-full rounded-xl border border-line bg-surface px-3 py-2.5 outline-none focus:border-brand"
            >
              <option value="">Choisir…</option>
              {CATEGORIES.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.label}
                </option>
              ))}
            </select>
          </label>

          <div className="grid grid-cols-2 gap-3">
            <label className="block text-sm">
              <span className="mb-1 block font-medium">Prix</span>
              <input
                required
                type="number"
                min={0}
                value={form.price ?? ''}
                onChange={(e) =>
                  setForm({
                    ...form,
                    price: e.target.value === '' ? null : Number(e.target.value),
                  })
                }
                className="w-full rounded-xl border border-line bg-surface px-3 py-2.5 outline-none focus:border-brand"
              />
            </label>
            <label className="block text-sm">
              <span className="mb-1 block font-medium">Devise</span>
              <select
                value={form.currency}
                onChange={(e) =>
                  setForm({ ...form, currency: e.target.value as Currency })
                }
                className="w-full rounded-xl border border-line bg-surface px-3 py-2.5 outline-none focus:border-brand"
              >
                <option value="USD">USD ($)</option>
                <option value="CDF">FC (CDF)</option>
              </select>
            </label>
          </div>

          <label className="block text-sm">
            <span className="mb-1 block font-medium">Commune</span>
            <select
              value={form.commune}
              onChange={(e) => setForm({ ...form, commune: e.target.value })}
              className="w-full rounded-xl border border-line bg-surface px-3 py-2.5 outline-none focus:border-brand"
            >
              {COMMUNES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>

          <label className="block text-sm">
            <span className="mb-1 block font-medium">Description</span>
            <textarea
              required
              rows={4}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Décrivez le bien, l’état, les points forts…"
              className="w-full resize-none rounded-xl border border-line bg-surface px-3 py-2.5 outline-none focus:border-brand"
            />
          </label>

          <div className="flex gap-2 pt-1">
            <button
              type="button"
              onClick={onSaveDraft}
              className="flex-1 rounded-xl border border-line bg-surface py-3 text-sm font-semibold"
            >
              {saved ? 'Brouillon sauvé ✓' : 'Sauver brouillon'}
            </button>
            <button
              type="submit"
              className="flex-1 rounded-xl bg-brand py-3 text-sm font-semibold text-white"
            >
              Publier
            </button>
          </div>
        </form>

        {drafts.length > 0 && (
          <section className="mt-8">
            <h2 className="text-sm font-bold">Brouillons locaux</h2>
            <ul className="mt-2 space-y-2">
              {drafts.map((d) => (
                <li
                  key={d.id}
                  className="flex items-center justify-between rounded-xl border border-line bg-surface px-3 py-2.5"
                >
                  <button
                    type="button"
                    className="min-w-0 flex-1 text-left"
                    onClick={() =>
                      setForm({
                        title: d.title,
                        category: d.category,
                        price: d.price,
                        currency: d.currency,
                        commune: d.commune,
                        description: d.description,
                      })
                    }
                  >
                    <p className="truncate text-sm font-semibold">
                      {d.title || 'Sans titre'}
                    </p>
                    <p className="text-xs text-muted">{d.commune}</p>
                  </button>
                  <button
                    type="button"
                    aria-label="Supprimer"
                    className="rounded-full p-2 text-muted hover:text-danger"
                    onClick={async () => {
                      await deleteDraft(d.id);
                      setDrafts(await listDrafts());
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </main>
  );
}
