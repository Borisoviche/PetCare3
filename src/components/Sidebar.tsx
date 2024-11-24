import { useState } from 'react';
import { ChevronRight, ChevronLeft, Filter, List, BarChart } from 'lucide-react';
import type { PetMarker } from '../types';
import PetList from './PetList';
import FilterPanel from './FilterPanel';
import Statistics from './Statistics';

interface SidebarProps {
  markers: PetMarker[];
  onFilterChange: (filters: { type?: 'cat' | 'dog'; needsFood?: boolean }) => void;
  onPetSelect: (id: string) => void;
}

export default function Sidebar({ markers, onFilterChange, onPetSelect }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<'list' | 'filter' | 'stats'>('list');

  return (
    <div className={`absolute top-16 left-0 h-[calc(100vh-4rem)] bg-white shadow-lg transition-all duration-300 ${isOpen ? 'w-80' : 'w-12'}`}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="absolute -right-3 top-4 bg-white rounded-full p-1 shadow-md"
      >
        {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
      </button>

      {isOpen && (
        <>
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('list')}
              className={`flex-1 p-3 flex items-center justify-center gap-2 ${activeTab === 'list' ? 'border-b-2 border-blue-500' : ''}`}
            >
              <List size={18} />
              <span>List</span>
            </button>
            <button
              onClick={() => setActiveTab('filter')}
              className={`flex-1 p-3 flex items-center justify-center gap-2 ${activeTab === 'filter' ? 'border-b-2 border-blue-500' : ''}`}
            >
              <Filter size={18} />
              <span>Filter</span>
            </button>
            <button
              onClick={() => setActiveTab('stats')}
              className={`flex-1 p-3 flex items-center justify-center gap-2 ${activeTab === 'stats' ? 'border-b-2 border-blue-500' : ''}`}
            >
              <BarChart size={18} />
              <span>Stats</span>
            </button>
          </div>

          <div className="overflow-y-auto h-[calc(100%-3.5rem)]">
            {activeTab === 'list' && (
              <PetList markers={markers} onPetSelect={onPetSelect} />
            )}
            {activeTab === 'filter' && (
              <FilterPanel onFilterChange={onFilterChange} />
            )}
            {activeTab === 'stats' && (
              <Statistics markers={markers} />
            )}
          </div>
        </>
      )}
    </div>
  );
}