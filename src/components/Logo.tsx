import Image from 'next/image';

interface LogoProps {
  dark?: boolean;
}

export default function Logo({ dark }: LogoProps) {
  const image = (
    <Image
      src="/anboss-hotel-logo.png"
      alt="Anboss Hotel"
      width={581}
      height={275}
      priority
      className="h-11 w-auto"
    />
  );

  if (!dark) {
    return image;
  }

  return <div className="inline-flex rounded-xl bg-white px-3 py-2">{image}</div>;
}
