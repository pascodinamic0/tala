# Tala × Supabase — étapes Pascal

Le compte free-tier lié à **flashrankmedia@gmail.com** est déjà à **2 projets actifs**.
Créer un projet « Tala » a échoué avec cette limite.

## Débloquer un slot

1. Ouvrir [Supabase Dashboard](https://supabase.com/dashboard) avec flashrankmedia@gmail.com
2. Pause ou supprimer un projet inutilisé (ex. Voicetoproposal ou SwiftDrop INACTIVE restent comptés selon le plan)
3. Créer un projet nommé **Tala** (région EU recommandée : `eu-west-1`)

## Brancher Tala

1. Project Settings → API : copier **Project URL** et **anon public** key
2. Dans le repo :

```bash
cp .env.example .env.local
# coller NEXT_PUBLIC_SUPABASE_URL et NEXT_PUBLIC_SUPABASE_ANON_KEY
```

3. SQL Editor → coller et exécuter `supabase/migrations/001_tala_schema.sql`
4. Redéployer (Netlify / Vercel) avec les mêmes variables d’environnement
5. Dans l’app : **Menu → Synchronisation cloud** → « Synchroniser maintenant »

## Comportement

- **Dexie** reste la source offline (favoris, brouillons, RDV)
- Quand Supabase est configuré, Sync pousse/tire : `sellers`, `listings`, `favorites`, `chat_threads`, `chat_messages`
- Sans clés : l’app tourne 100 % local + seed (chip « Local »)

## Note monétisation

Aucune commission % sur la vente. Monétisation = boosts + forfaits agents uniquement.
