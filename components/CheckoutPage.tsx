import React, { useState } from 'react';
import { Product } from '../types';
import Logo from './Logo';
import { HelpCircle, User, Plus, Check, Info, AlertCircle, Lock } from 'lucide-react';

interface CheckoutPageProps {
  items: Product[];
  total: number;
  originalTotal?: number; // For calculating savings display
  onBack: () => void;
  onContinue: () => void;
}

const CheckoutPage: React.FC<CheckoutPageProps> = ({ items, total, originalTotal, onBack, onContinue }) => {
  // Form State
  const [firstName, setFirstName] = useState('Hanif');
  const [lastName, setLastName] = useState('Eridaputra');
  const [email, setEmail] = useState('hanif@pelago.co');
  const [phone, setPhone] = useState('9482-6414');
  const [krisFlyer, setKrisFlyer] = useState('8884946478');
  
  // Calculate savings
  const savings = originalTotal ? originalTotal - total : 0;

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

      {/* Login Banner */}
      <div className="bg-gray-100 py-3 px-4 border-b border-gray-200">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-2 text-sm">
          <div className="flex items-center gap-2 text-pelago-dark">
            <User size={18} className="text-gray-500" />
            <span>You're logged in as <strong>{email}</strong></span>
          </div>
          <div className="text-gray-500">
            Not you? <button className="underline text-pelago-dark font-medium">Switch User</button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4 md:pt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Forms */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Contact Details */}
          <section>
            <h2 className="text-2xl font-bold text-pelago-dark mb-6">Contact details</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs text-gray-500 font-medium ml-1">First name</label>
                  <input 
                    type="text" 
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}
                    className="w-full p-3 rounded-xl border border-gray-300 focus:border-pelago-dark focus:ring-0 outline-none transition-all"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-gray-500 font-medium ml-1">Last name</label>
                  <input 
                    type="text" 
                    value={lastName}
                    onChange={e => setLastName(e.target.value)}
                    className="w-full p-3 rounded-xl border border-gray-300 focus:border-pelago-dark focus:ring-0 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs text-gray-500 font-medium ml-1">Email address</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full p-3 rounded-xl border border-gray-300 focus:border-pelago-dark focus:ring-0 outline-none transition-all"
                />
                <p className="text-xs text-gray-400 ml-1">Your voucher will be sent to this email address</p>
              </div>

              <div className="space-y-1">
                <label className="text-xs text-gray-500 font-medium ml-1">Contact number</label>
                <div className="flex">
                  <div className="w-20 flex-shrink-0 border border-r-0 border-gray-300 rounded-l-xl flex items-center justify-center bg-gray-50">
                    <span className="text-lg">🇸🇬</span>
                  </div>
                  <input 
                    type="tel" 
                    value={"+65 " + phone}
                    onChange={e => setPhone(e.target.value.replace('+65 ', ''))}
                    className="w-full p-3 rounded-r-xl border border-gray-300 focus:border-pelago-dark focus:ring-0 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs text-gray-500 font-medium ml-1">KrisFlyer membership number</label>
                <input 
                  type="text" 
                  value={krisFlyer}
                  onChange={e => setKrisFlyer(e.target.value)}
                  className="w-full p-3 rounded-xl border border-gray-300 focus:border-pelago-dark focus:ring-0 outline-none transition-all"
                />
                <p className="text-xs text-gray-400 ml-1 max-w-md">
                  Earn 224 KrisFlyer miles with this booking. To earn miles, please ensure your name matches your KrisFlyer account name.
                </p>
              </div>

              <div className="flex items-center gap-2 mt-2">
                <input type="checkbox" id="special-req" className="w-5 h-5 rounded border-gray-300 text-pelago-dark focus:ring-pelago-lime" />
                <label htmlFor="special-req" className="text-gray-600">Add special requests</label>
              </div>
            </div>
          </section>

          {/* Promo Code */}
          <section className="border border-gray-200 rounded-xl p-4 flex items-center justify-between cursor-pointer hover:border-gray-300 transition-colors">
            <div>
              <h3 className="font-bold text-pelago-dark">Promo code</h3>
              <p className="text-sm text-green-600 font-medium">You have 1 promo code available</p>
            </div>
            <Plus size={20} className="text-gray-400" />
          </section>

          {/* Booking Details / Extra Forms */}
          <section>
            <h2 className="text-2xl font-bold text-pelago-dark mb-6">Booking details</h2>
            
            {/* Example of dynamic field if an item requires it (e.g. eSIM) */}
            {items.some(i => i.title.toLowerCase().includes('esim') || i.title.toLowerCase().includes('roaming')) && (
               <div className="border border-gray-200 rounded-xl p-6 space-y-4 mb-6">
                 <h3 className="font-bold text-lg text-pelago-dark border-b border-gray-100 pb-2 mb-4">
                   Singapore Airlines Exclusive: Global Roaming eSIM
                 </h3>
                 <div className="space-y-1">
                    <div className="flex justify-between">
                      <label className="font-bold text-pelago-dark">Country of Activation</label>
                      <span className="text-orange-500 text-sm font-medium">Required</span>
                    </div>
                    <div className="p-3 border border-gray-300 rounded-xl text-gray-500 flex justify-between items-center cursor-not-allowed bg-gray-50">
                       <span>Select country</span>
                       <Plus size={16} className="rotate-45" />
                    </div>
                 </div>
               </div>
            )}
            
            <p className="text-gray-400 italic">No additional details required for other items.</p>
          </section>
        </div>

        {/* Right Column: Order Summary */}
        <div className="lg:col-span-1">
           <div className="border border-gray-200 rounded-2xl overflow-hidden shadow-sm sticky top-24">
             {/* Header */}
             <div className="bg-gray-50 p-4 border-b border-gray-200">
               <h3 className="font-bold text-lg text-pelago-dark">Order Summary</h3>
             </div>

             {/* Items List */}
             <div className="divide-y divide-gray-100">
               {items.map((item, idx) => {
                 const selectedOption = item.options?.find(o => o.id === item.selectedOptionId);
                 const price = selectedOption ? selectedOption.price * (item.quantity || 1) : item.price;
                 
                 // Apply rough discount if applicable to match the logic (simplified here for display)
                 const itemDiscountedPrice = originalTotal && total < originalTotal 
                    ? price * (total / originalTotal) 
                    : price;

                 return (
                   <div key={idx} className="p-4 flex gap-3">
                      <div className="w-16 h-16 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0">
                        <img src={item.image} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                         <h4 className="text-sm font-bold text-pelago-dark leading-tight mb-1">{item.title}</h4>
                         <div className="text-xs text-gray-500 mb-1">
                           {selectedOption?.title}
                         </div>
                         <div className="text-xs text-gray-500 mb-2">
                           {item.isOpenDated ? 'Open Dated' : (item.selectedDate || 'Date not selected')}
                         </div>
                         <div className="flex justify-between items-center">
                            <span className="text-xs text-gray-400">
                              {item.quantity || 1} x {selectedOption?.unitName || 'Pax'}
                            </span>
                            <span className="font-bold text-pelago-dark">S${itemDiscountedPrice.toFixed(2)}</span>
                         </div>
                      </div>
                   </div>
                 );
               })}
             </div>

             {/* Total Section */}
             <div className="p-4 bg-gray-50 border-t border-gray-200">
                <div className="flex justify-between items-end mb-1">
                  <span className="text-lg font-bold text-pelago-dark">Total</span>
                  <span className="text-2xl font-bold text-pelago-dark">S${total.toFixed(2)}</span>
                </div>
                <div className="text-right text-xs text-gray-500 mb-4">Inclusive of taxes</div>
                
                {savings > 0 && (
                  <div className="mb-4 bg-green-100 text-green-800 px-3 py-2 rounded-lg text-sm font-bold text-center">
                     You saved S${savings.toFixed(2)} on this bundle!
                  </div>
                )}

                <button 
                  onClick={onContinue}
                  className="w-full py-3.5 bg-black text-white font-bold rounded-xl hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 mb-3"
                >
                  Continue to payment
                </button>

                <div className="flex items-center justify-center gap-1 text-[10px] text-gray-500 font-medium uppercase tracking-wider">
                   <Check size={12} className="text-pelago-dark" />
                   Best Price Guaranteed
                   <Info size={12} className="text-gray-400 ml-1" />
                </div>
             </div>
           </div>
        </div>

      </div>
    </div>
  );
};

export default CheckoutPage;