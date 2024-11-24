import { useState, useCallback } from 'react';
import Map from './components/Map';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import AddPetForm from './components/AddPetForm';
import { usePetStore } from './store/petStore';
import type { PetMarker } from './types';

function App() {
  const [newPosition, setNewPosition] = useState<[number, number] | null>(null);
  const {
    markers,
    filters,
    selectedPetId,
    addMarker,
    setSelectedPetId,
    setFilters,
    feedPet,
    updateHealth,
    addVolunteer,
    addSchedule,
    addDonation
  } = usePetStore();

  const handleMarkerAdd = (position: [number, number]) => {
    setNewPosition(position);
  };

  const handleFormSubmit = (data: {
    type: 'cat' | 'dog';
    description: string;
    image?: string;
  }) => {
    if (newPosition) {
      const newMarker: PetMarker = {
        id: Date.now().toString(),
        position: newPosition,
        type: data.type,
        description: data.description,
        image: data.image,
        lastFed: new Date(),
        health: {
          lastCheck: new Date(),
          condition: 'healthy',
          notes: ['Initial check - appears healthy']
        },
        schedule: [],
        volunteers: [],
        donations: []
      };
      addMarker(newMarker);
      setNewPosition(null);
    }
  };

  const filteredMarkers = markers.filter(marker => {
    if (filters.type && marker.type !== filters.type) return false;
    if (filters.needsFood) {
      const lastFed = marker.lastFed ? new Date(marker.lastFed) : null;
      if (!lastFed || new Date().getTime() - lastFed.getTime() < 24 * 60 * 60 * 1000) {
        return false;
      }
    }
    if (filters.healthStatus && marker.health.condition !== filters.healthStatus) {
      return false;
    }
    return true;
  });

  return (
    <div className="h-screen flex flex-col">
      <Header />
      <main className="flex-1 relative">
        <Sidebar
          markers={filteredMarkers}
          onFilterChange={setFilters}
          onPetSelect={setSelectedPetId}
        />
        <Map
          markers={filteredMarkers}
          onMarkerAdd={handleMarkerAdd}
          onFeed={feedPet}
          onUpdateHealth={updateHealth}
          onAddVolunteer={addVolunteer}
          onAddSchedule={addSchedule}
          onAddDonation={addDonation}
          selectedPetId={selectedPetId}
        />
      </main>
      {newPosition && (
        <AddPetForm
          position={newPosition}
          onSubmit={handleFormSubmit}
          onClose={() => setNewPosition(null)}
        />
      )}
    </div>
  );
}

export default App;