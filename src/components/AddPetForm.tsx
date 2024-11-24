import React, { useState } from 'react';
import { Cat, Dog, X } from 'lucide-react';

interface AddPetFormProps {
  position: [number, number];
  onSubmit: (data: {
    type: 'cat' | 'dog';
    description: string;
    image?: string;
  }) => void;
  onClose: () => void;
}

export default function AddPetForm({ position, onSubmit, onClose }: AddPetFormProps) {
  const [type, setType] = useState<'cat' | 'dog'>('cat');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ type, description, image });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Add Pet Location</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex gap-4 mb-4">
            <button
              type="button"
              onClick={() => setType('cat')}
              className={`flex-1 p-3 rounded-lg border ${
                type === 'cat' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
              }`}
            >
              <Cat className="mx-auto mb-2" />
              <span>Cat</span>
            </button>
            <button
              type="button"
              onClick={() => setType('dog')}
              className={`flex-1 p-3 rounded-lg border ${
                type === 'dog' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
              }`}
            >
              <Dog className="mx-auto mb-2" />
              <span>Dog</span>
            </button>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border rounded-lg"
              rows={3}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Image URL (optional)
            </label>
            <input
              type="url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full p-2 border rounded-lg"
              placeholder="https://example.com/image.jpg"
            />
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
            >
              Add Location
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
    </div>
  );
}