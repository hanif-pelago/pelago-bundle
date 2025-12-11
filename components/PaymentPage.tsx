import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import Logo from './Logo';
import { HelpCircle, Lock, CreditCard, ChevronDown, Check, Info, ArrowRight } from 'lucide-react';

interface PaymentPageProps {
  items: Product[];
  total: number;
  onBack: () => void;
  onPay: () => void;
}

const PaymentPage: React.FC<PaymentPageProps> = ({ items, total, onBack, onPay }) => {
  // Timer State
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="min-h-screen bg-white font-sans pb-20">
      {/* Black Header */}
      <header className="bg-black text-white px-4 h-16 flex items-center justify-between sticky top-0 z-50">
        <div onClick={onBack} className="cursor-pointer">
          <Logo variant="white" className="h-8 w-auto" />
        </div>
        <button className="flex items-center gap-2 text-sm font-medium hover:text-gray-300 transition-colors">
          <HelpCircle size={18} />
          Support
        </button>
      </header>

      <div className="max-w-6xl mx-auto p-4 md:pt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Payment Form */}
        <div className="lg:col-span-2 space-y-6">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
             <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-pelago-dark">Secure checkout</h1>
                <Lock size={20} className="text-gray-400" />
             </div>
             
             <div className="bg-orange-50 text-orange-800 px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2">
                <ClockIcon />
                <span>Complete payment in {formatTime(timeLeft)} minutes</span>
             </div>
          </div>

          {/* Info Box */}
          <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl flex items-start gap-3 text-blue-800">
             <Info size={20} className="mt-0.5 flex-shrink-0" />
             <p className="text-sm font-medium">Your card will only be charged after booking(s) are confirmed.</p>
          </div>

          {/* Payment Methods */}
          <div className="space-y-4">
             {/* Method Selection */}
             <div className="flex gap-4">
                <button className="flex-1 p-4 border-2 border-black rounded-xl flex items-center gap-3 bg-white relative">
                   <CreditCard size={24} />
                   <span className="font-bold">Card</span>
                   <div className="absolute top-1/2 right-4 -translate-y-1/2 w-2 h-2 rounded-full bg-black"></div>
                </button>
                <button className="flex-1 p-4 border border-gray-200 rounded-xl flex items-center gap-3 bg-white text-gray-500 hover:bg-gray-50 transition-colors">
                   <GooglePayLogo />
                   <span className="font-medium">Google Pay</span>
                </button>
             </div>

             {/* Card Details Form */}
             <div className="p-6 border border-gray-200 rounded-2xl space-y-4 shadow-sm relative overflow-hidden">
                
                {/* 1Password Overlay Simulation */}
                <div className="absolute top-12 right-12 z-10 bg-black text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-2 cursor-pointer hover:bg-gray-800 transition-colors shadow-lg">
                   <div className="w-4 h-4 rounded-full bg-blue-500 border border-white"></div>
                   Unlock 1Password
                </div>

                <div className="space-y-1">
                   <label className="text-xs text-gray-500 font-medium ml-1">Card number</label>
                   <div className="relative">
                     <input 
                       type="text" 
                       placeholder="1234 1234 1234 1234"
                       className="w-full p-3 rounded-xl border border-gray-300 focus:border-black focus:ring-0 outline-none transition-all font-mono"
                     />
                     <div className="absolute top-1/2 right-3 -translate-y-1/2 flex gap-1">
                        <VisaLogo />
                        <MastercardLogo />
                        <AmexLogo />
                     </div>
                   </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                   <div className="space-y-1">
                     <label className="text-xs text-gray-500 font-medium ml-1">Expiry date</label>
                     <input 
                       type="text" 
                       placeholder="MM/YY"
                       className="w-full p-3 rounded-xl border border-gray-300 focus:border-black focus:ring-0 outline-none transition-all"
                     />
                   </div>
                   <div className="space-y-1">
                     <label className="text-xs text-gray-500 font-medium ml-1">Security code</label>
                     <div className="relative">
                       <input 
                         type="text" 
                         placeholder="123"
                         className="w-full p-3 rounded-xl border border-gray-300 focus:border-black focus:ring-0 outline-none transition-all"
                       />
                       <div className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400">
                          <CreditCard size={20} />
                       </div>
                     </div>
                   </div>
                </div>

                <div className="space-y-1">
                   <label className="text-xs text-gray-500 font-medium ml-1">Country</label>
                   <div className="relative">
                     <select className="w-full p-3 rounded-xl border border-gray-300 focus:border-black focus:ring-0 outline-none transition-all appearance-none bg-white">
                        <option>Singapore</option>
                        <option>United States</option>
                        <option>United Kingdom</option>
                     </select>
                     <ChevronDown size={16} className="absolute top-1/2 right-4 -translate-y-1/2 text-gray-500 pointer-events-none" />
                   </div>
                </div>
             </div>
          </div>

          <button 
            onClick={onPay}
            className="w-full py-4 bg-black text-white text-lg font-bold rounded-xl hover:bg-gray-900 transition-colors shadow-lg"
          >
            Pay EUR {total.toFixed(2)}
          </button>
          
          <p className="text-xs text-center text-gray-500">
             By proceeding, you agree to our <span className="text-blue-600 cursor-pointer">Terms of Use</span>, <span className="text-blue-600 cursor-pointer">Privacy</span> and <span className="text-blue-600 cursor-pointer">Cancellation</span> policies.
          </p>

        </div>

        {/* Right Column: Order Summary */}
        <div className="lg:col-span-1">
           <div className="border border-gray-200 rounded-2xl overflow-hidden shadow-sm sticky top-24">
             {/* Collapsible Header */}
             <div className="bg-white p-4 border-b border-gray-100 flex items-center justify-between cursor-pointer hover:bg-gray-50">
               <h3 className="font-bold text-lg text-pelago-dark">Booking details</h3>
               <ArrowRight size={16} className="text-gray-400" />
             </div>

             {/* Items List */}
             <div className="divide-y divide-gray-100 bg-white">
               {items.map((item, idx) => {
                 const selectedOption = item.options?.find(o => o.id === item.selectedOptionId);
                 const price = selectedOption ? selectedOption.price * (item.quantity || 1) : item.price;
                 
                 return (
                   <div key={idx} className="p-4">
                      <div className="flex gap-3 mb-3">
                        <div className="w-16 h-16 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0">
                          <img src={item.image} alt="" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1">
                           <h4 className="text-sm font-bold text-pelago-dark leading-tight mb-1">{item.title}</h4>
                           <div className="text-xs text-gray-500">
                             {item.description.substring(0, 50)}...
                           </div>
                        </div>
                      </div>

                      <div className="space-y-1 text-sm text-gray-600">
                         <div className="flex justify-between">
                            <span>{item.selectedDate || 'Open Dated'}</span>
                            <span className="font-medium">
                               {item.quantity || 1} {selectedOption?.unitName || 'Pax'}
                            </span>
                         </div>
                         <div className="flex items-center gap-2 text-xs text-gray-500">
                            {item.isOpenDated ? (
                               <>
                                  <div className="w-3 h-3"><ClockIcon /></div>
                                  <span>Instant confirmation</span>
                               </>
                            ) : (
                               <>
                                  <div className="w-3 h-3"><Check size={12} /></div>
                                  <span>Manual confirmation</span>
                               </>
                            )}
                            <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                            <span>{item.isOpenDated ? 'Free cancellation' : 'No cancellation'}</span>
                            <Info size={12} />
                         </div>
                      </div>
                      
                      <div className="flex justify-between items-center mt-3 pt-2 border-t border-gray-50">
                         <span className="font-bold text-sm text-pelago-dark">Subtotal</span>
                         <span className="font-bold text-pelago-dark">EUR {price.toFixed(2)}</span>
                      </div>
                   </div>
                 );
               })}
             </div>

             {/* Total Section */}
             <div className="p-4 bg-white border-t border-gray-200">
                <div className="flex justify-between items-end mb-1">
                  <span className="text-xl font-bold text-pelago-dark">Total</span>
                  <span className="text-xl font-bold text-pelago-dark">EUR {total.toFixed(2)}</span>
                </div>
                <div className="text-right text-xs text-gray-500 mb-4">Inclusive of taxes</div>
                
                <div className="flex items-center justify-center gap-1 text-[10px] text-gray-500 font-medium uppercase tracking-wider bg-gray-50 py-2 rounded-lg">
                   BEST PRICE GUARANTEED <Info size={12} className="text-gray-400" />
                </div>
             </div>
           </div>
        </div>

      </div>
    </div>
  );
};

// Simple Icons
const ClockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 16 14"></polyline>
  </svg>
);

const GooglePayLogo = () => (
   <svg viewBox="0 0 40 16" className="h-6 w-auto" xmlns="http://www.w3.org/2000/svg">
       <path fill="#4285F4" d="M15.3 0L17.7 0L17.7 11.5L15.3 11.5L15.3 0ZM11.4 6.2C10.7 5.5 9.8 5.2 8.7 5.2C7.5 5.2 6.4 5.7 5.5 6.5C4.7 7.3 4.3 8.3 4.3 9.5C4.3 10.7 4.7 11.7 5.5 12.5C6.4 13.3 7.5 13.8 8.7 13.8C9.8 13.8 10.7 13.4 11.4 12.8L11.4 12.8L11.5 13.6L13.7 13.6L13.7 0.3L11.4 0.3L11.4 4.5L11.4 6.2ZM9.0 11.6C7.9 11.6 7.0 10.7 7.0 9.5C7.0 8.3 7.9 7.4 9.0 7.4C10.2 7.4 11.1 8.3 11.1 9.5C11.1 10.7 10.2 11.6 9.0 11.6ZM19.7 15.3L22.2 15.3L22.2 9.0L24.6 15.3L27.0 15.3L20.8 0.3L18.4 0.3L21.3 7.4L19.7 11.2L19.7 15.3Z"/>
       <path fill="#5F6368" d="M37.7 5.3C37.2 4.9 36.6 4.6 35.8 4.6C34.3 4.6 33.1 5.4 32.5 6.6L32.4 7.0L30.0 12.8L32.4 12.8L33.8 9.3L37.8 9.3L38.2 10.3L38.2 10.3L40.7 10.3L37.7 5.3ZM36.9 7.5L34.5 7.5L35.8 4.4L36.9 7.5ZM3.8 9.5C3.8 6.7 5.9 4.4 8.7 4.4C10.0 4.4 11.0 4.9 11.7 5.6L10.3 7.0C9.9 6.6 9.4 6.3 8.7 6.3C7.0 6.3 5.7 7.8 5.7 9.5C5.7 11.2 7.0 12.6 8.7 12.6C9.8 12.6 10.5 12.2 10.9 11.8C11.2 11.5 11.4 11.0 11.5 10.4L8.7 10.4L8.7 8.5L13.4 8.5C13.5 8.9 13.5 9.2 13.5 9.6C13.5 11.4 12.3 14.5 8.7 14.5C5.9 14.5 3.8 12.3 3.8 9.5Z" />
   </svg>
);

const VisaLogo = () => (
    <div className="w-8 h-5 bg-blue-900 rounded flex items-center justify-center text-[8px] font-bold text-white italic">
        VISA
    </div>
);
const MastercardLogo = () => (
    <div className="w-8 h-5 bg-gray-800 rounded flex items-center justify-center relative overflow-hidden">
        <div className="w-4 h-4 rounded-full bg-red-500 absolute left-1 opacity-90"></div>
        <div className="w-4 h-4 rounded-full bg-yellow-500 absolute right-1 opacity-90"></div>
    </div>
);
const AmexLogo = () => (
    <div className="w-8 h-5 bg-blue-400 rounded flex items-center justify-center text-[6px] font-bold text-white">
        AMEX
    </div>
);

export default PaymentPage;