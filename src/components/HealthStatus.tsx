import { AlertCircle, CheckCircle, AlertTriangle } from 'lucide-react';
import type { HealthStatus as HealthStatusType } from '../types';
import { formatDistanceToNow } from 'date-fns';

interface HealthStatusProps {
  health: HealthStatusType;
  onUpdateHealth: (status: Partial<HealthStatusType>) => void;
}

export default function HealthStatus({ health, onUpdateHealth }: HealthStatusProps) {
  const getStatusIcon = () => {
    switch (health.condition) {
      case 'healthy':
        return <CheckCircle className="text-green-500" size={20} />;
      case 'needs-attention':
        return <AlertTriangle className="text-yellow-500" size={20} />;
      case 'urgent':
        return <AlertCircle className="text-red-500" size={20} />;
    }
  };

  return (
    <div className="border rounded-lg p-3 bg-gray-50">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-medium">Health Status</h3>
        <span className="text-xs text-gray-500">
          Last check: {formatDistanceToNow(health.lastCheck)} ago
        </span>
      </div>
      
      <div className="flex items-center gap-2 mb-3">
        {getStatusIcon()}
        <span className="capitalize">{health.condition.replace('-', ' ')}</span>
      </div>

      <div className="space-y-2">
        {health.notes?.map((note, index) => (
          <p key={index} className="text-sm text-gray-600">{note}</p>
        ))}
      </div>

      <div className="mt-3 flex gap-2">
        <button
          onClick={() => onUpdateHealth({ 
            condition: 'healthy',
            lastCheck: new Date(),
            notes: [...(health.notes || []), 'Pet appears healthy and active']
          })}
          className="flex-1 bg-green-100 text-green-700 px-3 py-1 rounded-md text-sm hover:bg-green-200"
        >
          Mark Healthy
        </button>
        <button
          onClick={() => onUpdateHealth({ condition: 'needs-attention', lastCheck: new Date() })}
          className="flex-1 bg-yellow-100 text-yellow-700 px-3 py-1 rounded-md text-sm hover:bg-yellow-200"
        >
          Needs Check
        </button>
      </div>
    </div>
  );
}