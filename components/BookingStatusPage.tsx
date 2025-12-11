import React from 'react';
import { Product } from '../types';
import Logo from './Logo';
import { HelpCircle, CheckCircle, ChevronRight, Info, Car } from 'lucide-react';

interface BookingStatusPageProps {
  items: Product[];
  onViewOrderDetails: () => void;
}

const BookingStatusPage: React.FC<BookingStatusPageProps> = ({ items, onViewOrderDetails }) => {
  return (
    <div className="min-h-screen bg-pelago-soft font-sans pb-20">
      {/* Black Header */}
      <header className="bg-black text-white px-4 h-16 flex items-center justify-between sticky top-0 z-50">
        <div className="cursor-pointer">
          <Logo variant="white" className="h-8 w-auto" />
        </div>
        <button className="flex items-center gap-2 text-sm font-medium hover:text-gray-300 transition-colors">
          <HelpCircle size={18} />
          Support
        </button>
      </header>

      <div className="max-w-3xl mx-auto p-4 md:pt-10 space-y-6">
        
        {/* Success Card */}
        <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm text-center md:text-left">
           <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
              <CheckCircle className="text-green-600 w-10 h-10 fill-green-50" />
              <div className="flex items-center gap-3">
                 <h1 className="text-2xl font-bold text-pelago-dark">Booking received</h1>
                 <span className="bg-gray-100 text-gray-500 text-xs font-medium px-2 py-1 rounded-md flex items-center gap-1 border border-gray-200">
                   Awaiting confirmation <Info size={10} />
                 </span>
              </div>
           </div>
           <p className="text-gray-600 pl-0 md:pl-14">
             We're currently processing your booking and will notify you via email shortly.
           </p>
        </div>

        {/* Order Details Link Card */}
        <div 
          onClick={onViewOrderDetails}
          className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow group"
        >
           <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h2 className="font-bold text-lg text-pelago-dark">View order details</h2>
              <ChevronRight className="text-gray-400 group-hover:text-pelago-dark transition-colors" />
           </div>
           
           <div className="p-6 bg-white space-y-6">
              {items.map((item, idx) => (
                 <div key={idx}>
                    <div className="text-sm text-green-600 font-medium mb-1">
                      Booking ID: PEL-{Math.random().toString(36).substr(2, 9).toUpperCase()}
                    </div>
                    <h3 className="font-bold text-pelago-dark text-lg mb-1">{item.title}</h3>
                    <p className="text-gray-500 text-sm">
                      {item.selectedOptionId ? 'Ticket/Voucher' : 'Private service'}
                    </p>
                    {idx < items.length - 1 && <hr className="mt-6 border-gray-100" />}
                 </div>
              ))}
           </div>
        </div>

        {/* App Download Promo */}
        <div className="bg-gray-100 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 border border-gray-200">
           <div className="flex items-center gap-4">
              <div className="w-12 h-20 bg-black rounded-lg border-2 border-gray-800 relative shadow-lg overflow-hidden flex-shrink-0">
                 {/* Mock Phone UI */}
                 <div className="absolute top-2 left-1 right-1 h-10 bg-gray-800 rounded-sm opacity-50"></div>
                 <div className="absolute bottom-2 left-1 right-1 h-4 bg-gray-800 rounded-sm opacity-50"></div>
              </div>
              <div>
                 <h3 className="font-bold text-lg text-pelago-dark">Get the Pelago app</h3>
                 <p className="text-gray-600">Manage your bookings easily on the go!</p>
              </div>
           </div>
           <div className="flex flex-col items-center gap-1">
              <div className="w-16 h-16 bg-white p-1 rounded-lg">
                 <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://pelago.co" alt="QR" className="w-full h-full" />
              </div>
              <span className="text-[10px] text-gray-500">Scan to download</span>
           </div>
        </div>

        {/* Cross Sell Promo */}
        <div className="bg-[#F0F9FF] rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 border border-blue-100">
           <div className="flex items-center gap-4">
              <div className="w-16 h-12 bg-white rounded-lg flex items-center justify-center text-blue-500 shadow-sm border border-blue-50">
                 <Car size={32} />
              </div>
              <div>
                 <h3 className="font-bold text-lg text-pelago-dark">Book airport transfers. Worldwide.</h3>
                 <p className="text-gray-600 text-sm">Relax with easy pick-up and drop-off at the airport or your hotel.</p>
              </div>
           </div>
           <button className="px-6 py-2.5 bg-white border border-gray-300 rounded-lg font-bold text-sm hover:bg-gray-50 transition-colors whitespace-nowrap shadow-sm">
             Book now
           </button>
        </div>

      </div>
    </div>
  );
};

export default BookingStatusPage;