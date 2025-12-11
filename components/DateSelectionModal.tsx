import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, X, Clock } from 'lucide-react';
import { Product } from '../types';

interface DateSelectionModalProps {
  product: Product;
  onClose: () => void;
  onSelectDate: (date: string) => void;
  onSelectLater: () => void;
}

const DateSelectionModal: React.FC<DateSelectionModalProps> = ({ 
  product, 
  onClose, 
  onSelectDate, 
  onSelectLater 
}) => {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  
  // Helpers for calendar generation
  const daysInMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const generateDays = () => {
    const totalDays = daysInMonth(currentMonth);
    const startDay = firstDayOfMonth(currentMonth);
    const days = [];

    // Empty cells for previous month
    for (let i = 0; i < startDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-14"></div>);
    }

    // Days
    for (let i = 1; i <= totalDays; i++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i);
      const isPast = date < new Date(new Date().setHours(0,0,0,0));
      const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
      const fullDateStr = date.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' });

      days.push(
        <button
          key={i}
          disabled={isPast}
          onClick={() => onSelectDate(fullDateStr)}
          className={`
            h-14 md:h-16 flex flex-col items-center justify-center rounded-lg border border-transparent transition-all
            ${isPast 
              ? 'text-gray-300 cursor-not-allowed' 
              : 'hover:border-pelago-lime hover:bg-pelago-soft text-pelago-dark cursor-pointer'}
          `}
        >
          <span className={`text-sm md:text-base font-medium ${isPast ? 'text-gray-300' : 'text-pelago-dark'}`}>{i}</span>
          {!isPast && (
            <span className="text-[10px] text-green-600 font-medium">S${product.price}</span>
          )}
        </button>
      );
    }
    return days;
  };

  const monthName = currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      ></div>

      <div className="relative bg-white w-full max-w-lg rounded-2xl shadow-xl overflow-hidden animate-slide-up flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 md:p-6 border-b border-gray-100 flex items-start justify-between">
          <div>
            <h3 className="text-lg md:text-xl font-bold text-pelago-dark pr-8">{product.title}</h3>
            <p className="text-sm text-gray-500 mt-1">[Pre-Opening] Admission Ticket</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Calendar Controls */}
        <div className="flex items-center justify-between px-6 py-4">
           <button onClick={handlePrevMonth} className="p-2 hover:bg-gray-100 rounded-full">
             <ChevronLeft size={20} />
           </button>
           <span className="font-bold text-lg text-pelago-dark">{monthName}</span>
           <button onClick={handleNextMonth} className="p-2 hover:bg-gray-100 rounded-full">
             <ChevronRight size={20} />
           </button>
        </div>

        {/* Days Header */}
        <div className="grid grid-cols-7 px-4 md:px-6 mb-2 text-center">
          {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
            <div key={d} className="text-xs text-gray-400 font-medium uppercase">{d}</div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="flex-1 overflow-y-auto px-4 md:px-6 pb-6">
          <div className="grid grid-cols-7 gap-1 md:gap-2">
            {generateDays()}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 md:p-6 border-t border-gray-100 bg-gray-50 flex items-center justify-between gap-4">
           <button 
             onClick={onSelectLater}
             className="flex items-center gap-2 text-sm font-semibold text-pelago-dark hover:text-pelago-limeHover transition-colors"
           >
             <Clock size={16} />
             I'll choose dates later
           </button>
        </div>
      </div>
    </div>
  );
};

export default DateSelectionModal;