import { create } from 'zustand';
import type { PetMarker, HealthStatus, Volunteer, FeedingSchedule, Donation } from '../types';

interface PetStore {
  markers: PetMarker[];
  selectedPetId: string | undefined;
  filters: {
    type?: 'cat' | 'dog';
    needsFood?: boolean;
    healthStatus?: HealthStatus['condition'];
  };
  addMarker: (marker: PetMarker) => void;
  updateMarker: (id: string, updates: Partial<PetMarker>) => void;
  setSelectedPetId: (id: string | undefined) => void;
  setFilters: (filters: PetStore['filters']) => void;
  addVolunteer: (petId: string, volunteer: Omit<Volunteer, 'id'>) => void;
  addSchedule: (petId: string, schedule: Omit<FeedingSchedule, 'id'>) => void;
  addDonation: (petId: string, donation: Omit<Donation, 'id' | 'date'>) => void;
  feedPet: (id: string) => void;
  updateHealth: (id: string, health: Partial<HealthStatus>) => void;
}

export const usePetStore = create<PetStore>((set) => ({
  markers: [
    {
      id: '1',
      position: [51.505, -0.09],
      type: 'cat',
      description: 'Friendly orange cat, needs food daily',
      lastFed: new Date('2024-03-10'),
      image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=500',
      health: {
        lastCheck: new Date('2024-03-10'),
        condition: 'healthy',
        notes: ['Regular visitor, very friendly']
      },
      schedule: [],
      volunteers: [],
      donations: []
    },
    {
      id: '2',
      position: [51.51, -0.1],
      type: 'dog',
      description: 'Medium-sized brown dog, very gentle',
      lastFed: new Date('2024-03-11'),
      image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=500',
      health: {
        lastCheck: new Date('2024-03-11'),
        condition: 'needs-attention',
        notes: ['Slight limp in right hind leg']
      },
      schedule: [],
      volunteers: [],
      donations: []
    }
  ],
  selectedPetId: undefined,
  filters: {},

  addMarker: (marker) => set((state) => ({
    markers: [...state.markers, marker]
  })),

  updateMarker: (id, updates) => set((state) => ({
    markers: state.markers.map((marker) =>
      marker.id === id ? { ...marker, ...updates } : marker
    )
  })),

  setSelectedPetId: (id) => set({ selectedPetId: id }),

  setFilters: (filters) => set({ filters }),

  addVolunteer: (petId, volunteer) => set((state) => ({
    markers: state.markers.map((marker) =>
      marker.id === petId
        ? {
            ...marker,
            volunteers: [
              ...(marker.volunteers || []),
              { ...volunteer, id: Date.now().toString() }
            ]
          }
        : marker
    )
  })),

  addSchedule: (petId, schedule) => set((state) => ({
    markers: state.markers.map((marker) =>
      marker.id === petId
        ? {
            ...marker,
            schedule: [
              ...(marker.schedule || []),
              { ...schedule, id: Date.now().toString() }
            ]
          }
        : marker
    )
  })),

  addDonation: (petId, donation) => set((state) => ({
    markers: state.markers.map((marker) =>
      marker.id === petId
        ? {
            ...marker,
            donations: [
              ...(marker.donations || []),
              { ...donation, id: Date.now().toString(), date: new Date() }
            ]
          }
        : marker
    )
  })),

  feedPet: (id) => set((state) => ({
    markers: state.markers.map((marker) =>
      marker.id === id ? { ...marker, lastFed: new Date() } : marker
    )
  })),

  updateHealth: (id, health) => set((state) => ({
    markers: state.markers.map((marker) =>
      marker.id === id
        ? {
            ...marker,
            health: { ...marker.health, ...health }
          }
        : marker
    )
  }))
}));