import { useState } from 'react';
import { Cat, Dog, Heart } from 'lucide-react';
import type { PetMarker, HealthStatus } from '../types';
import HealthStatus from './HealthStatus';
import VolunteerSchedule from './VolunteerSchedule';

interface PetMarkerPopupProps {
  pet: PetMarker;
  onFeed: (id: string) => void;
  onUpdateHealth: (id: string, health: Partial<HealthStatus>) => void;
  onAddVolunteer: (id: string, volunteer: any) => void;
  onAddSchedule: (id: string, schedule: any) => void;
}

export default function PetMarkerPopup({
  pet,
  onFeed,
  onUpdateHealth,
  onAddVolunteer,
  onAddSchedule
}: PetMarkerPopupProps) {
  const [isFeeding, setIsFeeding] = useState(false);

  const handleFeed = () => {
    setIsFeeding(true);
    onFeed(pet.id);
    setTimeout(() => setIsFeeding(false), 1000);
  };

  return (
    <div className="min-w-[300px] max-w-md">
      <div className="flex items-center gap-2 mb-3">
        {pet.type === 'cat' ? <Cat size={20} /> : <Dog size={20} />}
        <span className="font-semibold capitalize">{pet.type}</span>
      </div>

      {pet.image && (
        <img
          src={pet.image}
          alt={`${pet.type} at location`}
          className="w-full h-32 object-cover rounded-lg mb-3"
        />
      )}

      <p className="text-sm mb-3">{pet.description}</p>

      {pet.lastFed && (
        <p className="text-xs text-gray-600 mb-3">
          Last fed: {pet.lastFed.toLocaleDateString()}
        </p>
      )}

      <button
        onClick={handleFeed}
        disabled={isFeeding}
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 flex items-center justify-center gap-2 disabled:opacity-50 mb-4"
      >
        <Heart size={16} className={isFeeding ? 'animate-ping' : ''} />
        {isFeeding ? 'Feeding...' : 'Feed Pet'}
      </button>

      <div className="space-y-4">
        <HealthStatus
          health={pet.health}
          onUpdateHealth={(health) => onUpdateHealth(pet.id, health)}
        />

        <VolunteerSchedule
          schedule={pet.schedule}
          volunteers={pet.volunteers}
          onAddVolunteer={(volunteer) => onAddVolunteer(pet.id, volunteer)}
          onScheduleFeed={(schedule) => onAddSchedule(pet.id, schedule)}
        />
      </div>
    </div>
  );
}