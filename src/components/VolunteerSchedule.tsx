import { useState } from 'react';
import { Clock, Calendar, User } from 'lucide-react';
import type { FeedingSchedule, Volunteer } from '../types';

interface VolunteerScheduleProps {
  schedule?: FeedingSchedule[];
  volunteers?: Volunteer[];
  onAddVolunteer: (volunteer: Omit<Volunteer, 'id'>) => void;
  onScheduleFeed: (schedule: Omit<FeedingSchedule, 'id'>) => void;
}

export default function VolunteerSchedule({
  schedule,
  volunteers,
  onAddVolunteer,
  onScheduleFeed
}: VolunteerScheduleProps) {
  const [showVolunteerForm, setShowVolunteerForm] = useState(false);
  const [showScheduleForm, setShowScheduleForm] = useState(false);
  const [newVolunteer, setNewVolunteer] = useState({
    name: '',
    phone: '',
    availability: {
      days: [] as ('mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun')[],
      timeRanges: ['']
    },
    assignedPets: []
  });

  const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'] as const;

  const handleVolunteerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddVolunteer(newVolunteer);
    setShowVolunteerForm(false);
    setNewVolunteer({
      name: '',
      phone: '',
      availability: { days: [], timeRanges: [''] },
      assignedPets: []
    });
  };

  return (
    <div className="border rounded-lg p-3 bg-gray-50">
      <h3 className="font-medium mb-3">Volunteer Schedule</h3>

      {schedule && schedule.length > 0 ? (
        <div className="space-y-2 mb-4">
          {schedule.map((slot) => {
            const volunteer = volunteers?.find(v => v.id === slot.volunteerId);
            return (
              <div key={slot.id} className="flex items-center gap-2 text-sm">
                <Clock size={16} className="text-gray-500" />
                <span>{slot.time}</span>
                <span className="text-gray-500">•</span>
                <span className="capitalize">{slot.days.join(', ')}</span>
                {volunteer && (
                  <>
                    <span className="text-gray-500">•</span>
                    <span className="font-medium">{volunteer.name}</span>
                  </>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-sm text-gray-500 mb-4">No scheduled feeding times yet</p>
      )}

      <div className="flex gap-2">
        <button
          onClick={() => setShowVolunteerForm(true)}
          className="flex-1 flex items-center justify-center gap-2 bg-blue-100 text-blue-700 px-3 py-2 rounded-md text-sm hover:bg-blue-200"
        >
          <User size={16} />
          Add Volunteer
        </button>
        <button
          onClick={() => setShowScheduleForm(true)}
          className="flex-1 flex items-center justify-center gap-2 bg-green-100 text-green-700 px-3 py-2 rounded-md text-sm hover:bg-green-200"
        >
          <Calendar size={16} />
          Add Schedule
        </button>
      </div>

      {showVolunteerForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <form
            onSubmit={handleVolunteerSubmit}
            className="bg-white rounded-lg p-6 max-w-md w-full"
          >
            <h4 className="font-medium mb-4">Add New Volunteer</h4>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  value={newVolunteer.name}
                  onChange={(e) => setNewVolunteer({ ...newVolunteer, name: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone (optional)
                </label>
                <input
                  type="tel"
                  value={newVolunteer.phone}
                  onChange={(e) => setNewVolunteer({ ...newVolunteer, phone: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Available Days
                </label>
                <div className="flex flex-wrap gap-2">
                  {days.map((day) => (
                    <button
                      key={day}
                      type="button"
                      onClick={() => {
                        const newDays = newVolunteer.availability.days.includes(day)
                          ? newVolunteer.availability.days.filter(d => d !== day)
                          : [...newVolunteer.availability.days, day];
                        setNewVolunteer({
                          ...newVolunteer,
                          availability: { ...newVolunteer.availability, days: newDays }
                        });
                      }}
                      className={`px-3 py-1 rounded-full text-sm ${
                        newVolunteer.availability.days.includes(day)
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-2 mt-6">
              <button
                type="submit"
                className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
              >
                Add Volunteer
              </button>
              <button
                type="button"
                onClick={() => setShowVolunteerForm(false)}
                className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}