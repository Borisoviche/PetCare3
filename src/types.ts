export interface PetMarker {
  id: string;
  position: [number, number];
  type: 'cat' | 'dog';
  lastFed?: Date;
  description?: string;
  image?: string;
  health: HealthStatus;
  schedule?: FeedingSchedule[];
  volunteers?: Volunteer[];
  donations?: Donation[];
}

export interface HealthStatus {
  lastCheck: Date;
  condition: 'healthy' | 'needs-attention' | 'urgent';
  notes?: string[];
}

export interface FeedingSchedule {
  id: string;
  volunteerId: string;
  time: string; // HH:mm format
  days: ('mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun')[];
}

export interface Volunteer {
  id: string;
  name: string;
  phone?: string;
  availability: {
    days: ('mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun')[];
    timeRanges: string[]; // HH:mm-HH:mm format
  };
  assignedPets: string[]; // pet IDs
}

export interface Donation {
  id: string;
  amount: number;
  date: Date;
  donorName?: string;
  note?: string;
  type: 'food' | 'medical' | 'supplies' | 'money';
}