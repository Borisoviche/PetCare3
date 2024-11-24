import { useState, useEffect } from 'react';
import { Cat, Dog, AlertCircle, Clock } from 'lucide-react';
import type { HealthStatus } from '../types';

interface FilterPanelProps {
  onFilterChange: (filters: {
    type?: 'cat' | 'dog';
    needsFood?: boolean;
    healthStatus?: HealthStatus['condition'];
  }) => void;
}

export default function FilterPanel({ onFilterChange }: FilterPanelProps) {
  const [type, setType] = useState<'cat' | 'dog' | undefined>();
  const [needsFood, setNeedsFood] = useState(false);
  const [healthStatus, setHealthStatus] = useState<HealthStatus['condition']>();

  useEffect(() => {
    onFilterChange({ type, needsFood, healthStatus });
  }, [type, needsFood, healthStatus, onFilterChange]);

  return (
    <div className="space-y-6 p-4">
      <div>
        <h3 className="font-medium mb-3">Pet Type</h3>
        <div className="flex gap-2">
          <button
            onClick={() => setType(type === 'cat' ? undefined : 'cat')}
            className={`flex-1 p-3 rounded-lg border flex items-center justify-center gap-2
              ${type === 'cat' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
          >
            <Cat size={20} />
            <span>Cats</span>
          </button>
          <button
            onClick={() => setType(type === 'dog' ? undefined : 'dog')}
            className={`flex-1 p-3 rounded-lg border flex items-center justify-center gap-2
              ${type === 'dog' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
          >
            <Dog size={20} />
            <span>Dogs</span>
          </button>
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-3">Health Status</h3>
        <div className="flex gap-2">
          <button
            onClick={() => setHealthStatus(
              healthStatus === 'needs-attention' ? undefined : 'needs-attention'
            )}
            className={`flex-1 p-3 rounded-lg border flex items-center justify-center gap-2
              ${healthStatus === 'needs-attention' ? 'border-yellow-500 bg-yellow-50' : 'border-gray-200'}`}
          >
            <AlertCircle size={20} className="text-yellow-500" />
            <span>Needs Attention</span>
          </button>
          <button
            onClick={() => setHealthStatus(
              healthStatus === 'urgent' ? undefined : 'urgent'
            )}
            className={`flex-1 p-3 rounded-lg border flex items-center justify-center gap-2
              ${healthStatus === 'urgent' ? 'border-red-500 bg-red-50' : 'border-gray-200'}`}
          >
            <AlertCircle size={20} className="text-red-500" />
            <span>Urgent</span>
          </button>
        </div>
      </div>

      <div>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={needsFood}
            onChange={(e) => setNeedsFood(e.target.checked)}
            className="rounded border-gray-300 text-blue-500 focus:ring-blue-500"
          />
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-gray-500" />
            <span>Needs Food</span>
          </div>
        </label>
      </div>
    </div>
  );
}