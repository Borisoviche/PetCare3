import { useVirtualizer } from '@tanstack/react-virtual';
import { useRef } from 'react';
import { Cat, Dog, AlertCircle, Clock } from 'lucide-react';
import type { PetMarker } from '../types';
import { formatDistanceToNow } from 'date-fns';

interface PetListProps {
  markers: PetMarker[];
  onPetSelect: (id: string) => void;
}

export default function PetList({ markers, onPetSelect }: PetListProps) {
  const parentRef = useRef<HTMLDivElement>(null);
  
  const rowVirtualizer = useVirtualizer({
    count: markers.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 100,
    overscan: 5
  });

  return (
    <div ref={parentRef} className="h-full overflow-auto">
      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative'
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const marker = markers[virtualRow.index];
          return (
            <div
              key={marker.id}
              ref={virtualRow.measureRef}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                transform: `translateY(${virtualRow.start}px)`
              }}
              className="p-3"
            >
              <button
                onClick={() => onPetSelect(marker.id)}
                className="w-full bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4"
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0">
                    {marker.type === 'cat' ? (
                      <Cat size={24} className="text-blue-500" />
                    ) : (
                      <Dog size={24} className="text-blue-500" />
                    )}
                  </div>
                  <div className="flex-1 text-left">
                    <div className="flex items-center gap-2">
                      <span className="font-medium capitalize">{marker.type}</span>
                      {marker.health.condition !== 'healthy' && (
                        <AlertCircle
                          size={16}
                          className={
                            marker.health.condition === 'urgent'
                              ? 'text-red-500'
                              : 'text-yellow-500'
                          }
                        />
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                      {marker.description}
                    </p>
                    {marker.lastFed && (
                      <div className="flex items-center gap-1 mt-2 text-xs text-gray-500">
                        <Clock size={12} />
                        <span>
                          Fed {formatDistanceToNow(new Date(marker.lastFed))} ago
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}