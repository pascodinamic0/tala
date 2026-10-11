'use client';

import { useState } from 'react';
import { cn } from '@/lib/cn';

export function ListingImage({
  src,
  hue,
  emoji,
  alt,
  className,
  imgClassName,
}: {
  src: string;
  hue: number;
  emoji: string;
  alt: string;
  className?: string;
  imgClassName?: string;
}) {
  const [failed, setFailed] = useState(false);
  const gradient = `linear-gradient(145deg, hsl(${hue} 55% 92%), hsl(${hue} 45% 72%))`;

  if (failed || !src) {
    return (
      <div
        className={cn('flex items-center justify-center text-5xl', className)}
        style={{ background: gradient }}
        role="img"
        aria-label={alt}
      >
        <span aria-hidden>{emoji}</span>
      </div>
    );
  }

  return (
    <div className={cn('relative overflow-hidden bg-surface-2', className)} style={{ background: gradient }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className={cn('h-full w-full object-cover', imgClassName)}
        onError={() => setFailed(true)}
      />
    </div>
  );
}
