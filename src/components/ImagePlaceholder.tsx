import type { CSSProperties } from 'react';

interface ImagePlaceholderProps {
  label: string;
  height?: number | string;
  style?: CSSProperties;
}

export default function ImagePlaceholder({ label, height = 220, style }: ImagePlaceholderProps) {
  return (
    <div
      role="img"
      aria-label={label}
      style={{
        width: '100%',
        height,
        borderRadius: 20,
        background:
          'linear-gradient(135deg, #f6f2ec 0%, #ece3d6 100%)',
        border: '1px solid #eadfcd',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        color: '#a89f97',
        textAlign: 'center',
        padding: 16,
        ...style,
      }}
    >
      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="2" y="4" width="20" height="16" rx="2.5" stroke="#a89f97" strokeWidth="1.5" />
        <circle cx="8" cy="10" r="1.8" stroke="#a89f97" strokeWidth="1.5" />
        <path d="M3 17l5.5-5.5a1.5 1.5 0 0 1 2.12 0L14 15l2-2a1.5 1.5 0 0 1 2.12 0L21 16" stroke="#a89f97" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span style={{ fontSize: 12.5, fontWeight: 500, maxWidth: 220, lineHeight: 1.4 }}>{label}</span>
    </div>
  );
}
