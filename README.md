# Tala — Marché de Kinshasa

PWA marketplace **française-first** : immobilier, véhicules, électronique, classifieds.
Listings gratuits + boosts / forfaits agents. **Aucune commission sur la vente.**

## Stack

Next.js App Router · TypeScript · Tailwind · Motion · Dexie (offline) · Supabase (optionnel) · PWA

## Scripts

```bash
npm install
cp .env.example .env.local   # optionnel : clés Supabase
npm run dev
npm run build
npm start
```

## Supabase

Compte free-tier souvent à 2 projets. Voir **docs/SUPABASE.md** pour créer le projet, appliquer `supabase/migrations/001_tala_schema.sql`, et brancher Sync (Menu → Synchronisation cloud).

## Démo

`/demo` — parcours et chemins utiles.

Live : https://tala-kinshasa.netlify.app
