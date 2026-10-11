import type { ChatMessage, ChatThread } from '@/lib/types';

export const CHAT_THREADS: ChatThread[] = [
  {
    id: 'c1',
    listingId: 'l1',
    listingTitle: 'Appartement 3 chambres — Gombe',
    peerName: 'Agence Riviera',
    peerVerified: true,
    lastMessage: 'Oui, la visite est possible demain à 10 h.',
    updatedAt: '2026-10-10T18:22:00+01:00',
    unread: 1,
  },
  {
    id: 'c2',
    listingId: 'l5',
    listingTitle: 'Toyota RAV4 2021',
    peerName: 'Auto Kin Pro',
    peerVerified: true,
    lastMessage: 'Le prix est un peu négociable cash.',
    updatedAt: '2026-10-09T14:05:00+01:00',
    unread: 0,
  },
  {
    id: 'c3',
    listingId: 'l8',
    listingTitle: 'iPhone 15 Pro 256 Go',
    peerName: 'Tech Plaza',
    peerVerified: true,
    lastMessage: 'Toujours disponible, scellé.',
    updatedAt: '2026-10-08T11:40:00+01:00',
    unread: 0,
  },
];

export const CHAT_MESSAGES: Record<string, ChatMessage[]> = {
  c1: [
    {
      id: 'm1',
      threadId: 'c1',
      from: 'me',
      text: 'Bonjour, l’appartement est-il encore libre ?',
      createdAt: '2026-10-10T17:50:00+01:00',
    },
    {
      id: 'm2',
      threadId: 'c1',
      from: 'peer',
      text: 'Bonjour ! Oui, il est libre. Souhaitez-vous une visite ?',
      createdAt: '2026-10-10T18:05:00+01:00',
    },
    {
      id: 'm3',
      threadId: 'c1',
      from: 'me',
      text: 'Oui, demain matin si possible.',
      createdAt: '2026-10-10T18:12:00+01:00',
    },
    {
      id: 'm4',
      threadId: 'c1',
      from: 'peer',
      text: 'Oui, la visite est possible demain à 10 h.',
      createdAt: '2026-10-10T18:22:00+01:00',
    },
  ],
  c2: [
    {
      id: 'm5',
      threadId: 'c2',
      from: 'me',
      text: 'Bonjour, le RAV4 est-il négociable ?',
      createdAt: '2026-10-09T13:40:00+01:00',
    },
    {
      id: 'm6',
      threadId: 'c2',
      from: 'peer',
      text: 'Le prix est un peu négociable cash.',
      createdAt: '2026-10-09T14:05:00+01:00',
    },
  ],
  c3: [
    {
      id: 'm7',
      threadId: 'c3',
      from: 'me',
      text: 'L’iPhone est toujours dispo ?',
      createdAt: '2026-10-08T11:20:00+01:00',
    },
    {
      id: 'm8',
      threadId: 'c3',
      from: 'peer',
      text: 'Toujours disponible, scellé.',
      createdAt: '2026-10-08T11:40:00+01:00',
    },
  ],
};
