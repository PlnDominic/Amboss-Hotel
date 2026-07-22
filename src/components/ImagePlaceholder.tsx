interface ImagePlaceholderProps {
  label: string;
  className?: string;
}

export default function ImagePlaceholder({ label, className = 'h-[220px]' }: ImagePlaceholderProps) {
  return (
    <div
      role="img"
      aria-label={label}
      className={`flex w-full flex-col items-center justify-center gap-2.5 border border-brand-line bg-gradient-to-br from-brand-surface to-[#e8e8e8] p-4 text-center text-brand-muted-3 ${className}`}
    >
      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="2" y="4" width="20" height="16" rx="2.5" stroke="#979797" strokeWidth="1.5" />
        <circle cx="8" cy="10" r="1.8" stroke="#979797" strokeWidth="1.5" />
        <path
          d="M3 17l5.5-5.5a1.5 1.5 0 0 1 2.12 0L14 15l2-2a1.5 1.5 0 0 1 2.12 0L21 16"
          stroke="#979797"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="max-w-[220px] text-[12.5px] leading-[1.4] font-medium">{label}</span>
    </div>
  );
}
