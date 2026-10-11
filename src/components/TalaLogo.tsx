export function TalaLogo({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const h = size === 'lg' ? 36 : size === 'sm' ? 22 : 28;
  return (
    <span className="inline-flex items-center gap-1.5 font-display font-bold tracking-tight text-ink">
      <svg
        width={h}
        height={h}
        viewBox="0 0 48 48"
        fill="none"
        aria-hidden
      >
        <rect width="48" height="48" rx="14" fill="#E11D48" />
        <circle cx="24" cy="22" r="10" stroke="white" strokeWidth="3.5" />
        <circle cx="24" cy="22" r="4" fill="white" />
        <path
          d="M30 30 L36 38"
          stroke="white"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
      </svg>
      <span className={size === 'lg' ? 'text-2xl' : 'text-lg'}>
        Tala
      </span>
    </span>
  );
}

export function TalaMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      className={className}
      aria-hidden
    >
      <rect width="48" height="48" rx="14" fill="#E11D48" />
      <circle cx="24" cy="22" r="10" stroke="white" strokeWidth="3.5" />
      <circle cx="24" cy="22" r="4" fill="white" />
      <path
        d="M30 30 L36 38"
        stroke="white"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
