export default function FlourishDivider({ dark = false }: { dark?: boolean }) {
  return (
    <div className="flex items-center justify-center gap-3 my-3.5 select-none">
      <div className={`h-[1px] w-14 ${dark ? 'bg-white/25' : 'bg-brand-ink/20'}`} />
      <svg
        width="56"
        height="14"
        viewBox="0 0 100 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={dark ? 'text-white/70' : 'text-brand-ink/70'}
      >
        <path
          d="M50 0 C45 8, 35 12, 20 12 C10 12, 0 8, 0 12 C0 16, 10 12, 20 12 C35 12, 45 16, 50 24 C55 16, 65 12, 80 12 C90 12, 100 16, 100 12 C100 8, 90 12, 80 12 C65 12, 55 8, 50 0 Z"
          fill="currentColor"
        />
      </svg>
      <div className={`h-[1px] w-14 ${dark ? 'bg-white/25' : 'bg-brand-ink/20'}`} />
    </div>
  );
}
