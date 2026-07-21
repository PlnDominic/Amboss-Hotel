interface LogoProps {
  dark?: boolean;
}

export default function Logo({ dark }: LogoProps) {
  return (
    <div className="flex items-center gap-2.5">
      <div className="relative h-[23px] w-[26px] flex-none">
        <div className="absolute top-0 left-0 h-0 w-0 border-x-[13px] border-b-[12px] border-x-transparent border-b-brand-accent" />
        <div className={`absolute top-2.5 left-[5px] h-3 w-4 ${dark ? 'bg-brand-bg' : 'bg-brand-ink'}`} />
      </div>
      <div className={`font-display font-extrabold ${dark ? 'text-[19px] text-white' : 'text-[18px] text-brand-ink'}`}>
        anboss
      </div>
    </div>
  );
}
