import React from 'react';
import { ShoppingBag, Info, ArrowRight } from 'lucide-react';
import { DiscountTier } from '../types';

interface StickySummaryProps {
  count: number;
  originalTotal: number;
  finalTotal: number;
  discountTier: DiscountTier;
  onAddToCart: () => void;
}

const StickySummary: React.FC<StickySummaryProps> = ({
  count,
  originalTotal,
  finalTotal,
  discountTier,
  onAddToCart
}) => {
  const savings = originalTotal - finalTotal;
  const discountPercent = Math.round(discountTier * 100);
  const isEligible = count >= 2;

  // Determine progress text based on next tier
  let progressText = "";
  if (count === 0 || count === 1) {
    progressText = "Add 1 more to unlock 5% off";
  } else if (count === 2) {
    progressText = "Add 1 more for 8% off";
  } else if (count === 3) {
    progressText = "Add 1 more for 12% off";
  } else {
    progressText = "Max discount unlocked!";
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-50 pb-safe">
      <div className="max-w-3xl mx-auto px-4 py-3 md:py-4">
        
        {/* Progress / Tip Bar */}
        <div className="flex items-center justify-between mb-2 text-xs md:text-sm text-gray-500">
           <div className="flex items-center gap-1">
             <Info size={14} className="text-pelago-dark" />
             <span>{progressText}</span>
           </div>
           {isEligible && (
             <span className="text-green-600 font-medium">
               You save S${savings.toFixed(0)} ({discountPercent}%)
             </span>
           )}
        </div>

        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-col">
            <span className="text-sm text-gray-500">Total ({count} items)</span>
            <div className="flex items-baseline gap-2">
              <span className="text-xl md:text-2xl font-bold text-pelago-dark">
                S${finalTotal.toFixed(0)}
              </span>
              {isEligible && (
                <span className="text-sm text-gray-400 line-through decoration-gray-400">
                  S${originalTotal.toFixed(0)}
                </span>
              )}
            </div>
          </div>

          <button
            onClick={onAddToCart}
            disabled={!isEligible}
            className={`
              flex-1 md:flex-none md:w-64 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all
              ${isEligible 
                ? 'bg-pelago-dark text-white shadow-lg hover:bg-black active:scale-[0.98]' 
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'}
            `}
          >
            <span>Add Selected Items</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default StickySummary;