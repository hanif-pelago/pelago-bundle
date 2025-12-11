import React, { useState } from 'react';
import { Check, Star, Calendar, ChevronDown, Settings2 } from 'lucide-react';
import { Product } from '../types';
import DateSelectionModal from './DateSelectionModal';
import OptionSelectionModal from './OptionSelectionModal';

interface ProductListProps {
  products: Product[];
  selectedIds: Set<string>;
  onToggle: (id: string) => void;
  onUpdateProduct: (id: string, updates: Partial<Product>) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, selectedIds, onToggle, onUpdateProduct }) => {
  const [dateModalProduct, setDateModalProduct] = useState<Product | null>(null);
  const [optionModalProduct, setOptionModalProduct] = useState<Product | null>(null);

  const handleProductClick = (product: Product, isSelected: boolean) => {
    if (!isSelected) {
      // If adding, open option modal to configure first
      setOptionModalProduct(product);
    } else {
      // If already selected, removing it
      onToggle(product.id);
    }
  };

  const handleEditOption = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    setOptionModalProduct(product);
  };

  const handleOptionConfirm = (optionId: string, quantity: number) => {
    if (optionModalProduct) {
      onUpdateProduct(optionModalProduct.id, { 
        selectedOptionId: optionId, 
        quantity: quantity 
      });
      
      // Select the product if not already selected
      if (!selectedIds.has(optionModalProduct.id)) {
        onToggle(optionModalProduct.id);
      }
      setOptionModalProduct(null);
    }
  };

  const handleDateSelect = (dateStr: string) => {
    if (dateModalProduct) {
      onUpdateProduct(dateModalProduct.id, { selectedDate: dateStr, chooseLater: false });
      setDateModalProduct(null);
    }
  };

  const handleChooseLater = () => {
    if (dateModalProduct) {
      onUpdateProduct(dateModalProduct.id, { selectedDate: null, chooseLater: true });
      setDateModalProduct(null);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-3 md:gap-4">
        {products.map((product) => {
          const isSelected = selectedIds.has(product.id);
          const selectedOption = product.options?.find(o => o.id === product.selectedOptionId);
          // Calculate price based on option selection OR fallback to base price
          const displayPrice = selectedOption && product.quantity 
            ? selectedOption.price * product.quantity 
            : product.price;

          return (
            <div 
              key={product.id}
              className={`
                relative flex flex-col md:flex-row p-3 md:p-4 rounded-2xl border-2 transition-all select-none bg-white
                ${isSelected 
                  ? 'border-pelago-lime bg-pelago-soft shadow-sm' 
                  : 'border-transparent hover:border-gray-200 hover:shadow-sm'}
              `}
            >
              {/* Top Section: Image & Main Info */}
              <div className="flex items-start w-full">
                
                {/* Checkbox / Toggle */}
                <div 
                   onClick={() => handleProductClick(product, isSelected)}
                   className={`
                    w-6 h-6 md:w-8 md:h-8 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-colors mr-3 md:mr-4 mt-1 cursor-pointer
                    ${isSelected 
                      ? 'bg-pelago-lime border-pelago-lime text-pelago-dark' 
                      : 'border-gray-300 text-transparent'}
                  `}
                >
                  <Check size={16} strokeWidth={3} />
                </div>

                {/* Image */}
                <div 
                  className="relative w-20 h-20 md:w-28 md:h-28 flex-shrink-0 rounded-xl overflow-hidden bg-gray-100 cursor-pointer" 
                  onClick={() => handleProductClick(product, isSelected)}
                >
                  <img 
                    src={product.image} 
                    alt={product.title} 
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 ml-3 md:ml-4 flex flex-col">
                  <div className="flex justify-between items-start">
                     <div>
                        {product.badge && (
                          <span className="inline-block px-2 py-0.5 mb-1 text-[10px] font-bold uppercase tracking-wider text-pelago-dark bg-pelago-lime rounded-full">
                            {product.badge}
                          </span>
                        )}
                        <h3 
                          onClick={() => handleProductClick(product, isSelected)}
                          className="text-sm md:text-base font-semibold text-pelago-dark leading-tight cursor-pointer hover:text-gray-700"
                        >
                          {product.title}
                        </h3>
                     </div>
                  </div>
                  
                  {/* If selected, show Option Details instead of description */}
                  {isSelected && selectedOption ? (
                    <div 
                      onClick={(e) => handleEditOption(e, product)}
                      className="mt-2 text-xs md:text-sm bg-white/50 border border-pelago-lime/50 rounded-lg p-2 cursor-pointer hover:bg-white transition-colors inline-block"
                    >
                      <div className="flex items-center gap-1 font-bold text-pelago-dark">
                        {selectedOption.title}
                        <Settings2 size={12} className="text-gray-400" />
                      </div>
                      <div className="text-gray-600">
                        {product.quantity} x {selectedOption.unitName}
                      </div>
                    </div>
                  ) : (
                    <p className="text-xs md:text-sm text-gray-500 mt-1 line-clamp-2">
                      {product.description}
                    </p>
                  )}
                  
                  {/* Price & Rating */}
                  <div className="flex items-center gap-3 mt-2">
                     <span className="text-sm md:text-base font-bold text-pelago-dark">
                        S${displayPrice.toFixed(0)}
                        {!isSelected && <span className="text-xs font-normal text-gray-500 ml-1">starts from</span>}
                     </span>
                     {product.rating && (
                       <div className="flex items-center gap-1 text-xs text-gray-500">
                         <Star size={12} className="fill-yellow-400 text-yellow-400" />
                         <span>{product.rating}</span>
                         <span>({product.reviewCount})</span>
                       </div>
                     )}
                  </div>
                </div>
              </div>

              {/* Date Selection Section - Only show if selected */}
              {isSelected && (
                <div className="mt-3 md:mt-0 md:ml-auto md:w-48 flex flex-col justify-end pt-3 md:pt-0 border-t md:border-t-0 md:border-l border-gray-100 md:pl-4">
                  
                   {product.isOpenDated ? (
                     // Open Dated UI
                     <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-green-700 bg-green-50 px-2 py-1.5 rounded-lg border border-green-100">
                          <Check size={12} strokeWidth={3} />
                          <span>Open Dated</span>
                        </div>
                        <span className="text-[10px] text-gray-500 px-1">Valid for 180 days from purchase</span>
                     </div>
                   ) : (
                     // Date Selector UI
                     <div className="flex flex-col gap-2">
                        <button 
                          onClick={() => setDateModalProduct(product)}
                          className={`
                            flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium border transition-all
                            ${product.selectedDate 
                               ? 'bg-pelago-dark text-white border-pelago-dark' 
                               : product.chooseLater 
                                 ? 'bg-gray-100 text-gray-600 border-gray-200'
                                 : 'bg-white text-pelago-dark border-gray-300 hover:border-pelago-dark'}
                          `}
                        >
                          <div className="flex items-center gap-2 overflow-hidden">
                             <Calendar size={14} className={product.selectedDate ? 'text-pelago-lime' : ''} />
                             <span className="truncate">
                               {product.selectedDate || (product.chooseLater ? "Decide Later" : "Select Date")}
                             </span>
                          </div>
                          <ChevronDown size={14} className="flex-shrink-0 ml-1" />
                        </button>
                        
                        {!product.selectedDate && !product.chooseLater && (
                          <div 
                            onClick={() => onUpdateProduct(product.id, { selectedDate: null, chooseLater: true })}
                            className="text-[10px] text-center text-gray-400 underline cursor-pointer hover:text-gray-600"
                          >
                            Or decide later
                          </div>
                        )}
                     </div>
                   )}
                </div>
              )}

            </div>
          );
        })}
      </div>

      {/* Date Modal */}
      {dateModalProduct && (
        <DateSelectionModal 
          product={dateModalProduct} 
          onClose={() => setDateModalProduct(null)} 
          onSelectDate={handleDateSelect}
          onSelectLater={handleChooseLater}
        />
      )}

      {/* Option Selection Modal */}
      {optionModalProduct && (
        <OptionSelectionModal
          product={optionModalProduct}
          onClose={() => setOptionModalProduct(null)}
          onConfirm={handleOptionConfirm}
        />
      )}
    </>
  );
};

export default ProductList;