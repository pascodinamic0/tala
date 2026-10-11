import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: '/',
    name: 'Tala — Marché de Kinshasa',
    short_name: 'Tala',
    description:
      'Immobilier, véhicules et annonces à Kinshasa. Listings gratuits, boosts optionnels. Sans commission sur la vente.',
    lang: 'fr',
    dir: 'ltr',
    start_url: '/?source=pwa',
    scope: '/',
    display: 'standalone',
    display_override: ['standalone', 'minimal-ui'],
    orientation: 'portrait',
    background_color: '#e11d48',
    theme_color: '#e11d48',
    categories: ['shopping', 'lifestyle'],
    icons: [
      { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: '/icons/maskable-192.png', sizes: '192x192', type: 'image/png', purpose: 'maskable' },
      { src: '/icons/maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
      { src: '/icons/mark.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' },
    ],
    shortcuts: [
      { name: 'Publier une annonce', short_name: 'Publier', url: '/post', icons: [{ src: '/icons/icon-192.png', sizes: '192x192' }] },
      { name: 'Favoris', short_name: 'Favoris', url: '/favorites', icons: [{ src: '/icons/icon-192.png', sizes: '192x192' }] },
      { name: 'Messages', short_name: 'Chats', url: '/chats', icons: [{ src: '/icons/icon-192.png', sizes: '192x192' }] },
    ],
  };
}
