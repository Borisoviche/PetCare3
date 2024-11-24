import { useState } from 'react';
import { DollarSign } from 'lucide-react';
import type { Donation } from '../types';

interface DonationFormProps {
  onDonate: (donation: Omit<Donation, 'id' | 'date'>) => void;
  onClose: () => void;
}

export default function DonationForm({ onDonate, onClose }: DonationFormProps) {
  const [amount, setAmount] = useState('');
  const [donorName, setDonorName] = useState('');
  const [note, setNote] = useState('');
  const [type, setType] = useState<Donation['type']>('money');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onDonate({
      amount: parseFloat(amount),
      donorName,
      note,
      type
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex items-center gap-2 mb-4">
          <DollarSign className="text-green-500" />
          <h3 className="text-lg font-medium">Make a Donation</h3>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Amount ($)
            </label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Type
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as Donation['type'])}
              className="w-full p-2 border rounded-lg"
              required
            >
              <option value="money">Money</option>
              <option value="food">Food</option>
              <option value="medical">Medical Supplies</option>
              <option value="supplies">General Supplies</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Your Name (optional)
            </label>
            <input
              type="text"
              value={donorName}
              onChange={(e) => setDonorName(e.target.value)}
              className="w-full p-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Note (optional)
            </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full p-2 border rounded-lg"
              rows={3}
            />
          </div>
        </div>

        <div className="flex gap-2 mt-6">
          <button
            type="submit"
            className="flex-1 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
          >
            Donate
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}