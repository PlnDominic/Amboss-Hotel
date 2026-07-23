'use client';

import Image, { type ImageLoaderProps } from 'next/image';

interface GalleryImageTileProps {
  alt: string;
  className: string;
  sizes?: string;
  src: string;
  variantBase?: string;
}

function galleryVariantLoader({ src, width }: ImageLoaderProps) {
  const variantWidth = width <= 480 ? 480 : width <= 800 ? 800 : 1200;
  return `${src}-${variantWidth}.webp`;
}

export default function GalleryImageTile({ alt, className, sizes, src, variantBase }: GalleryImageTileProps) {
  return (
    <div className={`relative w-full overflow-hidden ${className}`}>
      <Image
        src={variantBase ?? src}
        loader={variantBase ? galleryVariantLoader : undefined}
        sizes={sizes}
        alt={alt}
        fill
        className="object-cover"
      />
    </div>
  );
}
