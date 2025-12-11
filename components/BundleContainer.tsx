import React, { useState, useEffect } from 'react';
import { Product, DiscountTier } from '../types';
import ProductList from './ProductList';
import StickySummary from './StickySummary';

interface BundleContainerProps {
  products: Product[];
  onClose?: () => void; // If it's a modal
  contextType: 'dynamic' | 'thematic';
  onAddToCart: (items: Product[], total: number) => void;
}

const BundleContainer: React.FC<BundleContainerProps> = ({ products: initialProducts, onClose, contextType, onAddToCart }) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  // Sync if props change significantly
  useEffect(() => {
    setProducts(initialProducts);
  }, [initialProducts]);

  // Auto-select first 2 items for dynamic bundle
  useEffect(() => {
    if (contextType === 'dynamic' && initialProducts.length >= 2 && selectedIds.size === 0) {
      const initialIds = new Set<string>();
      
      // We must pre-configure the first two products with default options
      setProducts(prev => prev.map((p, index) => {
        if (index < 2 && p.options && p.options.length > 0) {
          initialIds.add(p.id);
          return {
            ...p,
            selectedOptionId: p.options[0].id,
            quantity: 2 // Default quantity
          };
        }
        return p;
      }));
      
      setSelectedIds(initialIds);
    }
  }, [initialProducts, contextType]);

  const toggleProduct = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    setSelectedIds(next);
  };

  const handleUpdateProduct = (id: string, updates: Partial<Product>) => {
    setProducts(prev => prev.map(p => 
      p.id === id ? { ...p, ...updates } : p
    ));
  };

  // Calculations
  const selectedProducts = products.filter(p => selectedIds.has(p.id));
  const count = selectedProducts.length;
  
  // Calculate Total based on Selected Options and Quantities
  const originalTotal = selectedProducts.reduce((sum, p) => {
    const option = p.options?.find(o => o.id === p.selectedOptionId);
    const qty = p.quantity || 1;
    const itemPrice = option ? option.price : p.price;
    return sum + (itemPrice * qty);
  }, 0);

  let discountTier = DiscountTier.NONE;
  if (count === 2) discountTier = DiscountTier.TIER_1;
  else if (count === 3) discountTier = DiscountTier.TIER_2;
  else if (count >= 4) discountTier = DiscountTier.TIER_3;

  const discountAmount = originalTotal * discountTier;
  const finalTotal = originalTotal - discountAmount;

  // Progress Bar Logic
  // Milestones: 2 items (33%), 3 items (66%), 4 items (100%)
  let progressPercentage = 2; 
  if (count === 1) progressPercentage = 16;
  else if (count === 2) progressPercentage = 35; // slightly past 33
  else if (count === 3) progressPercentage = 68; // slightly past 66
  else if (count >= 4) progressPercentage = 100;

  let progressMessage = `Add ${Math.max(0, 2 - count)} more to unlock savings`;
  if (count === 2) progressMessage = "Add 1 more for 8% off";
  if (count === 3) progressMessage = "Add 1 more for 12% off";
  if (count >= 4) progressMessage = "Maximum savings unlocked!";

  return (
    <div className="pb-32"> {/* Padding for sticky footer */}
      
      {/* Discount Progress Bar */}
      <div className="bg-white rounded-2xl border border-gray-200 p-5 mb-6 shadow-sm">
         <div className="flex justify-between items-center mb-4">
            <div>
               <h3 className="font-bold text-pelago-dark text-sm md:text-base">Bundle & Save</h3>
               <p className="text-xs text-gray-500 mt-0.5">{progressMessage}</p>
            </div>
            <div className="text-right">
               <div className="flex items-baseline justify-end">
                 <span className="text-3xl font-bold text-pelago-dark tracking-tight leading-none">
                    {discountTier === DiscountTier.TIER_3 ? '12%' : discountTier === DiscountTier.TIER_2 ? '8%' : discountTier === DiscountTier.TIER_1 ? '5%' : '0%'}
                 </span>
                 <span className="text-xs font-bold text-gray-400 ml-1 uppercase">OFF</span>
               </div>
            </div>
         </div>

         {/* Bar Track */}
         <div className="relative h-3 bg-gray-100 rounded-full w-full overflow-hidden mb-2">
            {/* Markers/Ticks on track */}
            <div className="absolute top-0 bottom-0 left-[33%] w-0.5 bg-white/50 z-10 border-r border-gray-200/50"></div>
            <div className="absolute top-0 bottom-0 left-[66%] w-0.5 bg-white/50 z-10 border-r border-gray-200/50"></div>

            {/* Fill */}
            <div 
               className="absolute top-0 left-0 h-full bg-pelago-dark transition-all duration-700 ease-out"
               style={{ width: `${progressPercentage}%` }}
            ></div>
         </div>

         {/* Labels */}
         <div className="relative h-4 text-[10px] md:text-xs font-medium text-gray-400">
             <div className={`absolute left-[33%] -translate-x-1/2 transition-colors ${count >= 2 ? "text-pelago-dark font-bold" : ""}`}>
               2 items (5%)
             </div>
             <div className={`absolute left-[66%] -translate-x-1/2 transition-colors ${count >= 3 ? "text-pelago-dark font-bold" : ""}`}>
               3 items (8%)
             </div>
             <div className={`absolute right-0 transition-colors ${count >= 4 ? "text-pelago-dark font-bold" : ""}`}>
               4+ items (12%)
             </div>
         </div>
      </div>

      <ProductList 
        products={products} 
        selectedIds={selectedIds} 
        onToggle={toggleProduct}
        onUpdateProduct={handleUpdateProduct}
      />
      
      <StickySummary 
        count={count}
        originalTotal={originalTotal}
        finalTotal={finalTotal}
        discountTier={discountTier}
        onAddToCart={() => onAddToCart(selectedProducts, finalTotal)}
      />
    </div>
  );
};

export default BundleContainer;