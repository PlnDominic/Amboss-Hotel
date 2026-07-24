import Image from 'next/image';

interface LogoProps {
  dark?: boolean;
}

export default function Logo({ dark }: LogoProps) {
  const image = (
    <Image
      src="/anboss-hotel-logo.png"
      alt="Anboss Hotel"
      width={1586}
      height={992}
      priority
      className="h-11 w-auto"
    />
  );

  const tagline = (
    <span
      className="mt-0.5 text-[10px] leading-none tracking-wide text-brand-muted-2"
      style={{ fontFamily: 'Aptos, sans-serif' }}
    >
      Home Sweet Home
    </span>
  );

  if (!dark) {
    return (
      <span className="flex flex-col items-center">
        {image}
        {tagline}
      </span>
    );
  }

  return (
    <span className="flex flex-col items-center">
      <span className="inline-flex rounded-xl bg-white px-3 py-2">{image}</span>
      {tagline}
    </span>
  );
}
