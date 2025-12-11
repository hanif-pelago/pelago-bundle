import React from 'react';
import { Search, ChevronRight, MapPin, FerrisWheel, Ticket, Train, Smartphone, Ship, Castle, Coffee } from 'lucide-react';
import { BundleTheme } from '../types';
import Logo from './Logo';

interface HomePageProps {
  onStartBundle: () => void;
  onSelectTheme: (themeId: string) => void;
}

const CATEGORIES = [
  { name: 'Attractions', icon: FerrisWheel },
  { name: 'Tours', icon: MapPin },
  { name: 'Transport', icon: Train },
  { name: 'eSIM', icon: Smartphone },
  { name: 'Activities', icon: Ticket },
  { name: 'Wellness', icon: Coffee },
  { name: 'Cruises', icon: Ship },
  { name: 'Theme parks', icon: Castle },
  { name: 'Essentials', icon: Ticket }, // Added to match 9 icons grid roughly if needed, or keep 8
  { name: 'All', icon: Ticket }, // Simplified icon for All
];

// Adjust categories to match screenshot 8-9 items
const DISPLAY_CATEGORIES = [
  { name: 'Tours', icon: MapPin },
  { name: 'Transport', icon: Train },
  { name: 'eSIM', icon: Smartphone },
  { name: 'Activities', icon: Ticket },
  { name: 'Wellness', icon: Coffee },
  { name: 'Cruises', icon: Ship },
  { name: 'Theme parks', icon: Castle },
  { name: 'Essentials', icon: Ticket },
  { name: 'All', icon: Ticket },
];


const DESTINATIONS = [
  { name: 'Singapore', image: 'https://images.unsplash.com/photo-1565967511849-76a60a516170?auto=format&fit=crop&q=80&w=400' },
  { name: 'Tokyo', image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&q=80&w=400' },
  { name: 'Seoul', image: 'https://images.unsplash.com/photo-1538485399081-7191377e8241?auto=format&fit=crop&q=80&w=400' },
  { name: 'Bali', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=400' },
  { name: 'London', image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&q=80&w=400' },
];

const RECOMMENDED = [
  { 
    id: 1, 
    title: 'Disney Adventure by Disney Cruise Line', 
    location: 'Singapore', 
    price: 14, 
    image: 'https://images.unsplash.com/photo-1550596334-7bb40a71b6bc?auto=format&fit=crop&q=80&w=400', 
    rating: 4.8 
  },
  { 
    id: 2, 
    title: 'Universal Studios Japan - Express Pass', 
    location: 'Osaka', 
    price: 44, 
    image: 'https://images.unsplash.com/photo-1623941000258-293623d386de?auto=format&fit=crop&q=80&w=400', 
    rating: 4.5 
  },
];

const HomePage: React.FC<HomePageProps> = ({ onStartBundle, onSelectTheme }) => {
  return (
    <div className="bg-white min-h-screen pb-20 font-sans">
      {/* Hero Section */}
      <div className="relative h-[300px] md:h-[400px] w-full overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1200" 
          alt="Hero" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30"></div>
        
        {/* Header Overlay */}
        <div className="absolute top-0 left-0 right-0 p-4">
          <div className="max-w-6xl mx-auto flex justify-between items-center text-white">
             <div className="flex items-center gap-2 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-lg shadow-sm">
                <Logo className="h-8 md:h-9 w-auto" />
             </div>
             <div className="hidden md:flex items-center gap-6 text-sm font-medium">
                <span className="cursor-pointer hover:text-pelago-lime">Get the app</span>
                <span className="cursor-pointer hover:text-pelago-lime">USD</span>
                <span className="cursor-pointer hover:text-pelago-lime">English</span>
                <span className="cursor-pointer hover:text-pelago-lime">Support</span>
                <span className="cursor-pointer hover:text-pelago-lime">Cart</span>
                <span className="cursor-pointer hover:text-pelago-lime">Log in</span>
                <span className="px-4 py-1.5 border border-white rounded-full cursor-pointer hover:bg-white hover:text-pelago-dark transition-colors">Sign up</span>
             </div>
          </div>
        </div>

        {/* Hero Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 mt-8">
           <div className="w-full max-w-2xl bg-white rounded-full p-2 flex items-center shadow-lg mb-8">
              <Search className="text-gray-400 ml-3" size={20} />
              <input 
                type="text" 
                placeholder="Destination, attraction or activity"
                className="w-full h-10 px-3 rounded-full text-pelago-dark focus:outline-none"
              />
           </div>
           
           <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight drop-shadow-md">
             Book <span className="text-pelago-lime">200,000+</span><br/>activities worldwide
           </h1>
        </div>
      </div>

      {/* Blue Banner */}
      <div className="bg-[#1D9BF0] text-white px-4 py-3 cursor-pointer hover:bg-[#1a8cd8] transition-colors">
        <div className="max-w-6xl mx-auto flex items-center justify-center md:justify-between">
          <div className="flex items-center gap-2 font-medium text-sm md:text-base">
            <span className="font-bold">%</span>
            <span>Sign up to enjoy 10% off your first 2 bookings</span>
          </div>
          <ChevronRight size={18} className="hidden md:block" />
        </div>
      </div>

      <div className="max-w-6xl mx-auto pt-8">
        {/* Categories */}
        <div className="flex overflow-x-auto gap-4 md:gap-8 px-4 pb-8 no-scrollbar justify-start md:justify-center">
          {DISPLAY_CATEGORIES.map((cat, idx) => (
            <div key={idx} className="flex flex-col items-center gap-3 min-w-[72px] cursor-pointer group">
              <div className="w-14 h-14 rounded-full bg-pelago-soft flex items-center justify-center text-pelago-dark group-hover:bg-pelago-lime group-hover:text-pelago-dark transition-colors border border-gray-100">
                <cat.icon size={24} strokeWidth={1.5} />
              </div>
              <span className="text-sm text-pelago-dark font-medium whitespace-nowrap">{cat.name}</span>
            </div>
          ))}
        </div>

        {/* Updated Bundle Entry Points Section */}
        <div className="px-4 mb-16 mt-4">
           <h2 className="text-2xl md:text-3xl font-bold text-pelago-dark mb-6">Explore bundle deals</h2>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              {/* Card 1: Static Theme (First time in Singapore) */}
              <div 
                onClick={() => onSelectTheme('theme-singapore')}
                className="group relative h-96 rounded-2xl overflow-hidden cursor-pointer"
              >
                <img 
                  src="https://images.unsplash.com/photo-1565967511849-76a60a516170?auto=format&fit=crop&q=80&w=800" 
                  alt="Singapore" 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-white">
                   <h3 className="text-3xl font-bold mb-3 drop-shadow-md leading-tight">First Time in<br/>Singapore</h3>
                   <div className="mt-auto transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                     <p className="text-sm md:text-base font-medium opacity-95 drop-shadow-sm">
                       Essential experiences for first-time visitors. See the best of Singapore.
                     </p>
                   </div>
                </div>
              </div>

              {/* Card 2: Static Theme (Food Hunter) */}
              <div 
                onClick={() => onSelectTheme('theme-food')}
                className="group relative h-96 rounded-2xl overflow-hidden cursor-pointer"
              >
                <img 
                  src="https://images.unsplash.com/photo-1552590635-27c2c2128abf?auto=format&fit=crop&q=80&w=800" 
                  alt="Food" 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-white">
                   <h3 className="text-3xl font-bold mb-3 drop-shadow-md leading-tight">Food Hunter</h3>
                   <div className="mt-auto transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                     <p className="text-sm md:text-base font-medium opacity-95 drop-shadow-sm">
                       Discover Singapore's culinary delights. Taste the best local and international cuisines.
                     </p>
                   </div>
                </div>
              </div>

              {/* Card 3: Dynamic Bundle Entry */}
              <div 
                onClick={onStartBundle}
                className="group relative h-96 rounded-2xl overflow-hidden cursor-pointer ring-4 ring-transparent hover:ring-pelago-lime transition-all"
              >
                <img 
                  src="https://images.unsplash.com/photo-1503220317375-aaad61436b1b?auto=format&fit=crop&q=80&w=800" 
                  alt="Personalize" 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-white">
                   <h3 className="text-3xl font-bold mb-3 drop-shadow-md leading-tight">Personalise my<br/>bundle</h3>
                   <div className="mt-auto transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                     <p className="text-sm md:text-base font-medium opacity-95 drop-shadow-sm">
                       Tell us your preferences and we'll create a personalized bundle just for you.
                     </p>
                   </div>
                </div>
              </div>

           </div>
        </div>

        {/* Explore our destinations */}
        <div className="px-4 mb-16">
          <div className="flex justify-between items-end mb-6">
             <h2 className="text-2xl md:text-3xl font-bold text-pelago-dark">Explore our destinations</h2>
             <button className="text-sm font-semibold text-pelago-dark underline decoration-2 hover:text-pelago-limeHover transition-colors">See all destinations</button>
          </div>
          
          <div className="flex gap-2 flex-wrap mb-6">
            <button className="px-5 py-2 bg-pelago-dark text-white rounded-full text-sm font-medium">Popular</button>
            <button className="px-5 py-2 bg-gray-100 text-pelago-dark hover:bg-gray-200 rounded-full text-sm font-medium transition-colors">Asia</button>
            <button className="px-5 py-2 bg-gray-100 text-pelago-dark hover:bg-gray-200 rounded-full text-sm font-medium transition-colors">Oceania</button>
            <button className="px-5 py-2 bg-gray-100 text-pelago-dark hover:bg-gray-200 rounded-full text-sm font-medium transition-colors">Africa</button>
            <button className="px-5 py-2 bg-gray-100 text-pelago-dark hover:bg-gray-200 rounded-full text-sm font-medium transition-colors">North America</button>
            <button className="px-5 py-2 bg-gray-100 text-pelago-dark hover:bg-gray-200 rounded-full text-sm font-medium transition-colors">Europe</button>
          </div>

          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4 snap-x">
            {DESTINATIONS.map((dest, i) => (
              <div key={i} className="flex-shrink-0 w-40 md:w-56 group cursor-pointer snap-start">
                <div className="aspect-[3/4] rounded-2xl overflow-hidden mb-3 relative">
                  <img src={dest.image} alt={dest.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
                  <span className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white font-bold text-lg">{dest.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended for you */}
        <div className="px-4 mb-16">
          <h2 className="text-2xl font-bold text-pelago-dark mb-6">Recommended for you</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {RECOMMENDED.map(item => (
              <div key={item.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col hover:shadow-md transition-shadow cursor-pointer">
                <div className="h-56 relative overflow-hidden">
                   <img src={item.image} alt={item.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                   <div className="absolute top-4 right-4 bg-white/90 backdrop-blur rounded-full p-2 shadow-sm cursor-pointer hover:bg-white hover:text-red-500 transition-colors">
                      <div className="w-5 h-5 text-gray-400 hover:text-red-500">♥</div>
                   </div>
                   <div className="absolute bottom-4 left-4">
                      {item.id === 1 && (
                         <span className="px-3 py-1 bg-pelago-lime text-pelago-dark text-xs font-bold uppercase rounded-md shadow-sm">Exclusive</span>
                      )}
                   </div>
                </div>
                <div className="p-5 flex flex-col flex-1">
                   <div className="text-sm text-gray-500 mb-2">{item.location}</div>
                   <h3 className="text-xl font-bold text-pelago-dark mb-3 line-clamp-2">{item.title}</h3>
                   <div className="mt-auto pt-2 flex items-baseline gap-1">
                      <span className="text-sm text-gray-500">From</span>
                      <span className="text-xl font-bold text-pelago-dark">S${item.price}</span>
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default HomePage;