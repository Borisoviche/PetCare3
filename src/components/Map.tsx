import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import type { PetMarker, HealthStatus } from '../types';
import PetMarkerPopup from './PetMarkerPopup';
import 'leaflet/dist/leaflet.css';

interface MapProps {
  markers: PetMarker[];
  onMarkerAdd: (position: [number, number]) => void;
  onFeed: (id: string) => void;
  onUpdateHealth: (id: string, health: Partial<HealthStatus>) => void;
  onAddVolunteer: (id: string, volunteer: any) => void;
  onAddSchedule: (id: string, schedule: any) => void;
  selectedPetId?: string;
}

export default function Map({
  markers,
  onMarkerAdd,
  onFeed,
  onUpdateHealth,
  onAddVolunteer,
  onAddSchedule,
  selectedPetId
}: MapProps) {
  useEffect(() => {
    // Fix Leaflet icon issues
    delete (Icon.Default.prototype as any)._getIconUrl;
    Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    });
  }, []);

  return (
    <MapContainer
      center={[51.505, -0.09]}
      zoom={13}
      className="w-full h-[calc(100vh-4rem)]"
      onClick={(e: any) => {
        const { lat, lng } = e.latlng;
        onMarkerAdd([lat, lng]);
      }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markers.map((marker) => (
        <Marker 
          key={marker.id} 
          position={marker.position}
          opacity={selectedPetId ? (selectedPetId === marker.id ? 1 : 0.5) : 1}
        >
          <Popup>
            <PetMarkerPopup
              pet={marker}
              onFeed={onFeed}
              onUpdateHealth={onUpdateHealth}
              onAddVolunteer={onAddVolunteer}
              onAddSchedule={onAddSchedule}
            />
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}