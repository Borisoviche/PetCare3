import { useMemo } from 'react';
import { PieChart, DollarSign, Users, PawPrint } from 'lucide-react';
import type { PetMarker } from '../types';

interface StatisticsProps {
  markers: PetMarker[];
}

export default function Statistics({ markers }: StatisticsProps) {
  const stats = useMemo(() => {
    const totalPets = markers.length;
    const cats = markers.filter(m => m.type === 'cat').length;
    const dogs = markers.filter(m => m.type === 'dog').length;
    const totalVolunteers = new Set(
      markers.flatMap(m => m.volunteers?.map(v => v.id) || [])
    ).size;
    const totalDonations = markers.reduce((sum, m) => 
      sum + (m.donations?.reduce((s, d) => s + d.amount, 0) || 0), 0
    );

    return { totalPets, cats, dogs, totalVolunteers, totalDonations };
  }, [markers]);

  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      <div className="col-span-2 bg-blue-50 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <PieChart className="text-blue-500" />
          <h3 className="font-medium">Overview</h3>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">Total Pets</p>
            <p className="text-2xl font-bold text-blue-600">{stats.totalPets}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Volunteers</p>
            <p className="text-2xl font-bold text-blue-600">{stats.totalVolunteers}</p>
          </div>
        </div>
      </div>

      <div className="bg-green-50 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <PawPrint className="text-green-500" />
          <h3 className="font-medium">Pets</h3>
        </div>
        <div className="space-y-2">
          <div>
            <p className="text-sm text-gray-600">Cats</p>
            <p className="text-xl font-bold text-green-600">{stats.cats}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Dogs</p>
            <p className="text-xl font-bold text-green-600">{stats.dogs}</p>
          </div>
        </div>
      </div>

      <div className="bg-purple-50 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <DollarSign className="text-purple-500" />
          <h3 className="font-medium">Donations</h3>
        </div>
        <p className="text-sm text-gray-600">Total Received</p>
        <p className="text-xl font-bold text-purple-600">
          ${stats.totalDonations.toFixed(2)}
        </p>
      </div>
    </div>
  );
}