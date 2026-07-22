import Image from 'next/image';
import type { RoomInfo } from '@/types';
import ImagePlaceholder from './ImagePlaceholder';

interface RoomImageProps {
  room: RoomInfo;
  className?: string;
}

export default function RoomImage({ room, className }: RoomImageProps) {
  if (room.image) {
    return (
      <div className={`relative w-full overflow-hidden ${className ?? 'h-[220px]'}`}>
        <Image src={room.image} alt={`${room.name} interior`} fill className="object-cover" />
      </div>
    );
  }

  return <ImagePlaceholder label={`${room.name} photo`} className={className} />;
}
