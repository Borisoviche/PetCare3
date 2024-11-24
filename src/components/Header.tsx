import { PawPrint } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <PawPrint className="text-blue-500" size={32} />
          <h1 className="text-xl font-bold text-gray-900">PetCare Network</h1>
        </div>
        <nav className="flex gap-4">
          <button className="text-gray-600 hover:text-gray-900">About</button>
          <button className="text-gray-600 hover:text-gray-900">Help</button>
        </nav>
      </div>
    </header>
  );
}