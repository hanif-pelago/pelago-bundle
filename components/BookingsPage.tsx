import React, { useState } from 'react';
import { 
  Heart, Calendar, MessageSquare, User, Settings, LogOut, 
  Gift, Home, Search, ChevronRight 
} from 'lucide-react';
import { Product } from '../types';
import Logo from './Logo';

interface PurchasedBundle {
  title: string;
  items: Product[];
  total: number;
  image: string;
}

interface BookingsPageProps {
  bundle: PurchasedBundle | null;
  onBack: () => void;
  onViewDetails: () => void;
}

const BookingsPage: React.FC<BookingsPageProps> = ({ bundle, onBack, onViewDetails }) => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');

  const bookingId = `PEL-839201`;

  return (
    <div className="bg-white min-h-screen font-sans flex flex-col md:flex-row">
      
      {/* Sidebar - Desktop */}
      <div className="hidden md:flex w-72 flex-col border-r border-gray-100 min-h-screen sticky top-0 h-screen p-6">
         {/* Logo */}
         <div onClick={onBack} className="mb-10 cursor-pointer">
            <Logo className="h-10 w-auto" />
         </div>

         {/* Nav Items */}
         <nav className="space-y-1 flex-1">
            <NavItem icon={Heart} label="Wishlists" />
            <NavItem icon={Calendar} label="Bookings" active />
            <NavItem icon={Gift} label="Rewards" />
            <NavItem icon={MessageSquare} label="Reviews" />
            <NavItem icon={User} label="Profile" />
            <NavItem icon={Gift} label="Refer & earn" badge="NEW" />
            <NavItem icon={Settings} label="Settings" />
         </nav>

         <button className="flex items-center gap-4 px-4 py-3 text-gray-500 hover:text-pelago-dark transition-colors mt-auto">
            <LogOut size={20} />
            <span className="font-medium">Log out</span>
         </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 min-w-0">
         {/* Mobile Header */}
         <div className="md:hidden flex items-center justify-between p-4 border-b border-gray-100 bg-white sticky top-0 z-20">
            <div onClick={onBack} className="cursor-pointer">
              <Logo className="h-7 w-auto" />
            </div>
            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
              <User size={16} />
            </div>
         </div>

         <div className="max-w-4xl mx-auto p-4 md:p-10 pb-24 md:pb-10">
            <h1 className="text-3xl font-bold text-pelago-dark mb-6">Bookings</h1>

            {/* Tabs */}
            <div className="flex border-b border-gray-200 mb-8">
               <button 
                 onClick={() => setActiveTab('upcoming')}
                 className={`flex-1 md:flex-none md:w-40 pb-3 text-sm font-bold border-b-2 transition-colors
                   ${activeTab === 'upcoming' 
                     ? 'border-pelago-dark text-pelago-dark' 
                     : 'border-transparent text-gray-400 hover:text-gray-600'}
                 `}
               >
                 Upcoming
               </button>
               <button 
                 onClick={() => setActiveTab('past')}
                 className={`flex-1 md:flex-none md:w-40 pb-3 text-sm font-bold border-b-2 transition-colors
                   ${activeTab === 'past' 
                     ? 'border-pelago-dark text-pelago-dark' 
                     : 'border-transparent text-gray-400 hover:text-gray-600'}
                 `}
               >
                 Past & Cancelled
               </button>
            </div>

            {/* Content Area */}
            {activeTab === 'upcoming' ? (
              <div className="space-y-6">
                
                {bundle ? (
                  // New Bundle Card
                  <div 
                    onClick={onViewDetails}
                    className="bg-white rounded-2xl border border-gray-200 p-5 md:p-6 shadow-sm hover:shadow-lg transition-all cursor-pointer group"
                  >
                     <div className="flex flex-col md:flex-row gap-6">
                        
                        {/* Info Section */}
                        <div className="flex-1 order-2 md:order-1">
                           <div className="text-green-600 font-bold text-sm mb-2 flex items-center gap-2">
                             <div className="w-2 h-2 rounded-full bg-green-600"></div>
                             Confirmed
                           </div>
                           
                           <h2 className="text-xl md:text-2xl font-bold text-pelago-dark mb-2 group-hover:text-pelago-limeHover transition-colors">
                             {bundle.title}
                           </h2>
                           
                           <p className="text-sm text-gray-500 font-medium mb-4">
                             Booking ID: {bookingId} • {bundle.items.length} Activities
                           </p>

                           {/* Activities Preview List */}
                           <div className="bg-gray-50 rounded-xl p-4 mb-5 space-y-3">
                              {bundle.items.slice(0, 3).map((item, idx) => (
                                <div key={idx} className="flex gap-3 items-center">
                                   <div className={`min-w-[80px] text-xs font-bold pt-0.5 ${!item.selectedDate && !item.isOpenDated ? 'text-orange-500' : 'text-gray-400'}`}>
                                      {item.isOpenDated ? 'Open Date' : (item.selectedDate || 'Select Date')}
                                   </div>
                                   <div className="text-sm font-medium text-pelago-dark truncate">
                                      {item.title}
                                   </div>
                                </div>
                              ))}
                              {bundle.items.length > 3 && (
                                <div className="text-xs text-gray-400 pl-[92px]">+{bundle.items.length - 3} more items</div>
                              )}
                           </div>

                           <div className="flex items-center justify-between md:justify-start md:gap-8 mb-6">
                              <div>
                                <div className="text-xs text-gray-400 font-medium uppercase tracking-wide">Total</div>
                                <div className="text-lg font-bold text-pelago-dark">S${bundle.total.toFixed(0)}</div>
                              </div>
                              <div>
                                <div className="text-xs text-gray-400 font-medium uppercase tracking-wide">Pax</div>
                                <div className="text-lg font-bold text-pelago-dark">2 Adults</div>
                              </div>
                           </div>

                           <button 
                             onClick={(e) => {
                               e.stopPropagation();
                               onViewDetails();
                             }}
                             className="w-full md:w-auto px-6 py-3 bg-pelago-dark text-white rounded-xl font-bold text-sm hover:bg-black transition-colors flex items-center justify-center gap-2"
                           >
                             Manage Booking
                             <ChevronRight size={16} />
                           </button>
                        </div>

                        {/* Image Section */}
                        <div className="order-1 md:order-2 w-full md:w-64 h-48 md:h-auto flex-shrink-0">
                           <div className="w-full h-full rounded-xl overflow-hidden bg-gray-100 relative">
                             <img 
                               src={bundle.image} 
                               alt={bundle.title} 
                               className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                             />
                             <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded text-xs font-bold shadow-sm text-pelago-dark">
                               Bundle
                             </div>
                           </div>
                        </div>

                     </div>
                  </div>
                ) : (
                  <div className="text-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                    <p className="text-gray-400 font-medium">No upcoming bookings found.</p>
                    <button onClick={onBack} className="mt-4 text-pelago-dark underline font-bold">Start exploring</button>
                  </div>
                )}

                {/* Example of another booking (Processing) */}
                <div className="bg-white rounded-2xl border border-gray-200 p-5 md:p-6 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all">
                    <div className="flex flex-col md:flex-row gap-6">
                       <div className="flex-1 order-2 md:order-1">
                          <div className="text-orange-500 font-bold text-sm mb-2">Processing</div>
                          <h2 className="text-xl font-bold text-pelago-dark mb-1">
                            Universal Express at Universal Studios Hollywood
                          </h2>
                          <p className="text-sm text-gray-500 mb-4">Adult x 2, Child x 2</p>
                          <div className="text-lg font-bold text-pelago-dark mb-4">S$ 480</div>
                          <button className="w-full md:w-auto px-6 py-3 bg-gray-100 text-gray-400 rounded-xl font-bold text-sm cursor-not-allowed">
                            View voucher
                          </button>
                       </div>
                       <div className="order-1 md:order-2 w-full md:w-48 h-32 md:h-32 flex-shrink-0 rounded-xl overflow-hidden">
                          <img 
                            src="https://images.unsplash.com/photo-1623941000258-293623d386de?auto=format&fit=crop&q=80&w=400" 
                            alt="Universal" 
                            className="w-full h-full object-cover"
                          />
                       </div>
                    </div>
                </div>

              </div>
            ) : (
              <div className="text-center py-20 text-gray-400">No past bookings.</div>
            )}
         </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 pb-safe z-50">
        <div className="flex justify-around items-center h-16">
          <div onClick={onBack} className="flex flex-col items-center gap-1 text-gray-400">
            <Home size={24} strokeWidth={1.5} />
            <span className="text-[10px] font-medium">Explore</span>
          </div>
          <div className="flex flex-col items-center gap-1 text-gray-400">
            <Search size={24} strokeWidth={1.5} />
            <span className="text-[10px] font-medium">Search</span>
          </div>
          <div className="flex flex-col items-center gap-1 text-gray-400">
            <Heart size={24} strokeWidth={1.5} />
            <span className="text-[10px] font-medium">Wishlists</span>
          </div>
          <div className="flex flex-col items-center gap-1 text-pelago-dark">
            <Calendar size={24} strokeWidth={2.5} className="fill-pelago-lime text-pelago-dark" />
            <span className="text-[10px] font-bold">Bookings</span>
          </div>
          <div className="flex flex-col items-center gap-1 text-gray-400">
            <User size={24} strokeWidth={1.5} />
            <span className="text-[10px] font-medium">Account</span>
          </div>
        </div>
      </div>

    </div>
  );
};

// Helper Component for Sidebar Nav Items
const NavItem = ({ icon: Icon, label, active, badge }: { icon: any, label: string, active?: boolean, badge?: string }) => (
  <div className={`
    flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer transition-all
    ${active 
      ? 'bg-pelago-soft text-pelago-dark font-bold' 
      : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900 font-medium'}
  `}>
    <div className="flex items-center gap-4">
      <Icon size={20} strokeWidth={active ? 2.5 : 2} />
      <span>{label}</span>
    </div>
    {badge && (
      <span className="text-[10px] font-bold bg-green-100 text-green-700 px-1.5 py-0.5 rounded">
        {badge}
      </span>
    )}
  </div>
);

export default BookingsPage;