import React, { useState } from 'react';
import { ArrowLeft, Calendar, Check, Clock, MapPin, ChevronRight, User, Download, Share2, AlertCircle } from 'lucide-react';
import { Product } from '../types';
import DateSelectionModal from './DateSelectionModal';

interface BookingDetailsPageProps {
  bundle: {
    title: string;
    items: Product[];
    total: number;
    image: string;
  };
  onBack: () => void;
  onUpdateProductDate: (productId: string, date: string) => void;
}

const BookingDetailsPage: React.FC<BookingDetailsPageProps> = ({ bundle, onBack, onUpdateProductDate }) => {
  const [dateModalProduct, setDateModalProduct] = useState<Product | null>(null);
  const bookingId = "PEL-839201"; // Mock ID

  const handleDateSelect = (dateStr: string) => {
    if (dateModalProduct) {
      onUpdateProductDate(dateModalProduct.id, dateStr);
      setDateModalProduct(null);
    }
  };

  return (
    <div className="bg-white min-h-screen font-sans">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-3xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <ArrowLeft size={20} className="text-pelago-dark" />
            </button>
            <h1 className="font-bold text-lg text-pelago-dark">Booking Details</h1>
          </div>
          <div className="flex gap-2">
             <button className="p-2 hover:bg-gray-100 rounded-full text-gray-600">
               <Share2 size={20} />
             </button>
             <button className="p-2 hover:bg-gray-100 rounded-full text-gray-600">
               <Download size={20} />
             </button>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-6 md:py-8 pb-32">
        
        {/* Bundle Summary Card */}
        <div className="bg-pelago-dark text-white rounded-2xl p-6 mb-8 relative overflow-hidden">
           <div className="relative z-10">
             <div className="text-xs font-bold uppercase tracking-wider text-pelago-lime mb-2">Bundle Booking</div>
             <h2 className="text-2xl font-bold mb-1">{bundle.title}</h2>
             <p className="text-gray-400 text-sm mb-4">Ref: {bookingId}</p>
             
             <div className="flex items-center gap-6">
               <div>
                 <div className="text-xs text-gray-400 uppercase">Total Paid</div>
                 <div className="font-bold text-lg">S${bundle.total.toFixed(0)}</div>
               </div>
               <div>
                 <div className="text-xs text-gray-400 uppercase">Status</div>
                 <div className="font-bold text-lg text-green-400 flex items-center gap-1">
                   <Check size={16} /> Confirmed
                 </div>
               </div>
             </div>
           </div>
           
           {/* Background Decoration */}
           <div className="absolute top-0 right-0 w-64 h-full opacity-10 pointer-events-none">
              <img src={bundle.image} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent to-pelago-dark"></div>
           </div>
        </div>

        <h3 className="text-xl font-bold text-pelago-dark mb-4">Your Activities</h3>

        <div className="space-y-4">
          {bundle.items.map((item) => {
            const needsDate = !item.isOpenDated && !item.selectedDate;
            const selectedOption = item.options?.find(o => o.id === item.selectedOptionId);
            const qty = item.quantity || 0;
            const unit = selectedOption?.unitName || 'Pax';

            return (
              <div 
                key={item.id} 
                className={`
                  bg-white rounded-xl border-2 p-4 flex flex-col md:flex-row gap-4 transition-all
                  ${needsDate ? 'border-orange-100 shadow-sm' : 'border-gray-100'}
                `}
              >
                {/* Image */}
                <div className="w-full md:w-24 h-32 md:h-24 rounded-lg bg-gray-100 flex-shrink-0 overflow-hidden">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-pelago-dark text-base md:text-lg leading-tight">{item.title}</h4>
                  </div>
                  
                  {/* Option & Quantity Details */}
                  {selectedOption && (
                    <div className="mb-3 text-sm text-gray-600 bg-gray-50 px-2 py-1.5 rounded inline-block">
                       <span className="font-bold text-pelago-dark">{selectedOption.title}</span>
                       <span className="mx-1.5 text-gray-300">|</span>
                       <span>{qty} {unit}</span>
                    </div>
                  )}

                  {/* Status Badges */}
                  <div className="flex flex-col gap-3">
                    {item.isOpenDated ? (
                      <div className="flex items-start gap-3 bg-green-50 p-3 rounded-lg border border-green-100">
                        <div className="mt-0.5 text-green-700"><Check size={16} strokeWidth={3} /></div>
                        <div>
                          <div className="text-sm font-bold text-green-700">Open Dated Ticket</div>
                          <div className="text-xs text-green-600 mt-0.5">Valid for 180 days from purchase. Visit anytime.</div>
                        </div>
                      </div>
                    ) : (
                      <>
                        {item.selectedDate ? (
                          <div className="flex items-start gap-3 bg-blue-50 p-3 rounded-lg border border-blue-100">
                             <div className="mt-0.5 text-blue-700"><Calendar size={16} strokeWidth={2.5} /></div>
                             <div>
                               <div className="text-sm font-bold text-blue-700">Scheduled: {item.selectedDate}</div>
                               <div className="text-xs text-blue-600 mt-0.5">Please arrive 15 mins before.</div>
                             </div>
                             <button 
                               onClick={() => setDateModalProduct(item)}
                               className="ml-auto text-xs font-bold text-blue-700 underline"
                             >
                               Change
                             </button>
                          </div>
                        ) : (
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-orange-50 p-3 rounded-lg border border-orange-100">
                             <div className="flex items-start gap-3">
                                <div className="mt-0.5 text-orange-600"><AlertCircle size={16} strokeWidth={2.5} /></div>
                                <div>
                                  <div className="text-sm font-bold text-orange-700">Date Selection Required</div>
                                  <div className="text-xs text-orange-600 mt-0.5">Select a date to receive your voucher.</div>
                                </div>
                             </div>
                             <button 
                               onClick={() => setDateModalProduct(item)}
                               className="px-4 py-2 bg-pelago-dark text-white text-sm font-bold rounded-lg shadow-sm hover:bg-black transition-colors whitespace-nowrap"
                             >
                               Select Date
                             </button>
                          </div>
                        )}
                      </>
                    )}
                  </div>

                  {/* Voucher Actions - Only show if valid (Open Dated or Date Selected) */}
                  {(item.isOpenDated || item.selectedDate) && (
                    <div className="mt-4 pt-4 border-t border-gray-100 flex gap-4">
                      <button className="flex-1 py-2 text-sm font-bold text-pelago-dark border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        View Voucher
                      </button>
                      <button className="flex-1 py-2 text-sm font-bold text-pelago-dark border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        How to Redeem
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Support Section */}
        <div className="mt-8 p-4 bg-gray-50 rounded-xl flex items-center justify-between">
           <div className="text-sm text-gray-500">Need help with your booking?</div>
           <button className="text-sm font-bold text-pelago-dark underline">Contact Support</button>
        </div>

      </main>

      {/* Date Modal */}
      {dateModalProduct && (
        <DateSelectionModal 
          product={dateModalProduct} 
          onClose={() => setDateModalProduct(null)} 
          onSelectDate={handleDateSelect}
          onSelectLater={() => setDateModalProduct(null)} // Just close modal
        />
      )}
    </div>
  );
};

export default BookingDetailsPage;