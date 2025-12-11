import React, { useState } from 'react';
import { X, Check, Minus, Plus } from 'lucide-react';
import { Product, ProductOption } from '../types';

interface OptionSelectionModalProps {
  product: Product;
  onClose: () => void;
  onConfirm: (optionId: string, quantity: number) => void;
}

const OptionSelectionModal: React.FC<OptionSelectionModalProps> = ({ 
  product, 
  onClose, 
  onConfirm 
}) => {
  // Default to existing selection or first option
  const [selectedOptionId, setSelectedOptionId] = useState<string>(
    product.selectedOptionId || product.options?.[0]?.id || ''
  );
  const [quantity, setQuantity] = useState<number>(product.quantity || 2);

  const selectedOption = product.options?.find(o => o.id === selectedOptionId);

  const handleIncrement = () => setQuantity(prev => Math.min(prev + 1, 20));
  const handleDecrement = () => setQuantity(prev => Math.max(prev - 1, 1));

  const handleConfirm = () => {
    if (selectedOptionId) {
      onConfirm(selectedOptionId, quantity);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      ></div>

      <div className="relative bg-white w-full max-w-lg rounded-2xl shadow-xl overflow-hidden animate-slide-up flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-white z-10">
          <h3 className="text-lg font-bold text-pelago-dark truncate pr-4">{product.title}</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          {/* Step 1: Choose Option */}
          <div className="mb-6">
            <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-3">Select Option</h4>
            <div className="space-y-3">
              {product.options?.map((option) => (
                <div 
                  key={option.id}
                  onClick={() => setSelectedOptionId(option.id)}
                  className={`
                    cursor-pointer p-4 rounded-xl border-2 transition-all flex justify-between items-center
                    ${selectedOptionId === option.id 
                      ? 'border-pelago-lime bg-pelago-soft' 
                      : 'border-gray-100 hover:border-gray-200'}
                  `}
                >
                  <div>
                    <div className="font-bold text-pelago-dark">{option.title}</div>
                    {option.description && (
                      <div className="text-xs text-gray-500 mt-0.5">{option.description}</div>
                    )}
                  </div>
                  <div className="font-bold text-pelago-dark">
                    S${option.price}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Step 2: Quantity */}
          <div className="mb-4">
             <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-3">Quantity</h4>
             <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                <div className="font-medium text-pelago-dark">
                  {selectedOption?.unitName || 'Pax'}
                </div>
                
                <div className="flex items-center gap-4">
                   <button 
                     onClick={handleDecrement}
                     disabled={quantity <= 1}
                     className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50 transition-colors"
                   >
                     <Minus size={16} />
                   </button>
                   <span className="text-xl font-bold w-6 text-center">{quantity}</span>
                   <button 
                     onClick={handleIncrement}
                     className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors"
                   >
                     <Plus size={16} />
                   </button>
                </div>
             </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-gray-100 bg-gray-50">
           <div className="flex justify-between items-center mb-4">
              <span className="text-gray-500 font-medium">Total Price</span>
              <span className="text-2xl font-bold text-pelago-dark">
                S${((selectedOption?.price || 0) * quantity).toFixed(0)}
              </span>
           </div>
           <button 
             onClick={handleConfirm}
             className="w-full py-3 bg-pelago-dark text-white font-bold rounded-xl hover:bg-black transition-colors flex items-center justify-center gap-2"
           >
             Confirm Selection
           </button>
        </div>
      </div>
    </div>
  );
};

export default OptionSelectionModal;