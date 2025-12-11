import React, { useState } from 'react';
import { UserPreferences } from '../types';
import { 
  Sparkles, MapPin, 
  User, Users, Baby, UserPlus, 
  Tent, Palette, Landmark, Martini, Leaf, Camera, Bird 
} from 'lucide-react';

interface PreferencesFormProps {
  onSubmit: (prefs: UserPreferences) => void;
  isLoading: boolean;
}

// Icon mapping for Interests
const INTERESTS_DATA = [
  { id: 'Adventure', icon: Tent, label: 'Adventure' },
  { id: 'Arts', icon: Palette, label: 'Arts' },
  { id: 'Culture', icon: Landmark, label: 'Culture' },
  { id: 'Food', icon: Martini, label: 'Food' },
  { id: 'Wellness', icon: Leaf, label: 'Wellness' },
  { id: 'Gems', icon: Sparkles, label: 'Gems' }, // Hidden Gems
  { id: 'Iconic', icon: Camera, label: 'Iconic' },
  { id: 'Nature', icon: Bird, label: 'Nature' },
];

// Icon mapping for Companions
const COMPANIONS_DATA = [
  { id: 'Solo', icon: User, label: 'Solo' },
  { id: 'Partner', icon: Users, label: 'Partner' },
  { id: 'Group', icon: Users, label: 'Group' },
  { id: 'Kids', icon: Baby, label: 'Kids' },
  { id: 'Elderly', icon: UserPlus, label: 'Elderly' },
];

const PreferencesForm: React.FC<PreferencesFormProps> = ({ onSubmit, isLoading }) => {
  const [destination, setDestination] = useState('Singapore');
  const [companions, setCompanions] = useState('Partner');
  const [interests, setInterests] = useState<string[]>([]);

  const toggleInterest = (interest: string) => {
    if (interests.includes(interest)) {
      setInterests(interests.filter(i => i !== interest));
    } else {
      setInterests([...interests, interest]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ destination, companions, interests });
  };

  return (
    <div className="max-w-xl mx-auto mt-8 md:mt-12 p-6 md:p-10 bg-white rounded-[32px] shadow-xl border border-gray-100">
      <div className="text-center mb-10">
        <h1 className="text-2xl md:text-3xl font-bold text-pelago-dark mb-2">Personalise your bundle</h1>
        <p className="text-gray-500">Tell us what you love, and we'll curate the perfect savings package.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-10">
        {/* Destination */}
        <div>
          <label className="block text-lg font-bold text-pelago-dark mb-4">
            Where are you travelling to?
          </label>
          <div className="relative">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <select 
              value={destination} 
              onChange={(e) => setDestination(e.target.value)}
              className="w-full p-4 pl-12 rounded-2xl border border-gray-200 focus:border-pelago-dark focus:ring-0 outline-none transition-all appearance-none bg-white text-lg font-medium text-pelago-dark cursor-pointer hover:border-gray-400"
            >
              <option value="Singapore">Singapore</option>
              <option value="Tokyo">Tokyo, Japan</option>
              <option value="Bangkok">Bangkok, Thailand</option>
              <option value="Seoul">Seoul, South Korea</option>
              <option value="Bali">Bali, Indonesia</option>
            </select>
          </div>
        </div>

        {/* Companions */}
        <div>
          <label className="block text-lg font-bold text-pelago-dark mb-4">
            Who are you travelling with?
          </label>
          <div className="grid grid-cols-4 gap-4">
            {COMPANIONS_DATA.map((item) => {
              const Icon = item.icon;
              const isSelected = companions === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setCompanions(item.id)}
                  className={`
                    flex flex-col items-center justify-center py-4 rounded-2xl transition-all border-2
                    ${isSelected 
                      ? 'border-pelago-dark bg-pelago-soft' 
                      : 'border-transparent hover:bg-gray-50 text-gray-500'}
                  `}
                >
                  <Icon 
                    size={28} 
                    strokeWidth={1.5} 
                    className={`mb-2 ${isSelected ? 'text-pelago-dark' : 'text-inherit'}`} 
                  />
                  <span className={`text-sm font-medium ${isSelected ? 'text-pelago-dark' : 'text-inherit'}`}>
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Interests */}
        <div>
          <label className="block text-lg font-bold text-pelago-dark mb-2">
            What are you interested in? 
            <span className="text-gray-400 text-base font-normal ml-2">Pick as many as you like!</span>
          </label>
          <div className="grid grid-cols-4 gap-y-6 gap-x-2 mt-4">
            {INTERESTS_DATA.map((item) => {
              const Icon = item.icon;
              const isSelected = interests.includes(item.id);
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => toggleInterest(item.id)}
                  className="flex flex-col items-center group"
                >
                  <div className={`
                    w-16 h-16 rounded-full flex items-center justify-center mb-2 transition-all border
                    ${isSelected 
                      ? 'bg-pelago-lime border-pelago-dark text-pelago-dark' 
                      : 'bg-white border-transparent hover:bg-gray-50 text-gray-600 hover:border-gray-200'}
                  `}>
                    <Icon size={24} strokeWidth={1.5} />
                  </div>
                  <span className={`text-sm font-medium ${isSelected ? 'text-pelago-dark' : 'text-gray-500'}`}>
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button 
            type="submit" 
            disabled={isLoading || interests.length === 0}
            className="w-full py-4 bg-gray-100 hover:bg-pelago-lime text-gray-400 hover:text-pelago-dark font-bold rounded-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-pelago-dark border-t-transparent rounded-full animate-spin"></div>
                Building Bundle...
              </>
            ) : (
              <>
                <Sparkles size={18} className="group-hover:text-pelago-dark" />
                Generate
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PreferencesForm;