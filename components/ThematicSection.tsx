import React from 'react';
import { BundleTheme } from '../types';
import { THEMATIC_BUNDLES } from '../constants';
import { ChevronRight } from 'lucide-react';

interface ThematicSectionProps {
  onSelectTheme: (theme: BundleTheme) => void;
}

const ThematicSection: React.FC<ThematicSectionProps> = ({ onSelectTheme }) => {
  return (
    <div className="mt-12 md:mt-16">
      <div className="flex items-center justify-between mb-6 px-4 md:px-0">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-pelago-dark">Explore Bundle Deals</h2>
          <p className="text-sm text-gray-500 mt-1">Curated collections by our travel experts.</p>
        </div>
        <button className="text-sm font-semibold text-pelago-dark flex items-center gap-1 hover:underline">
          See all <ChevronRight size={14} />
        </button>
      </div>

      <div className="flex overflow-x-auto gap-4 px-4 pb-8 md:px-0 no-scrollbar snap-x snap-mandatory">
        {THEMATIC_BUNDLES.map(theme => (
          <div 
            key={theme.id}
            onClick={() => onSelectTheme(theme)}
            className="flex-shrink-0 w-72 md:w-80 snap-start bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow cursor-pointer border border-gray-100 group"
          >
            {/* Hero Image */}
            <div className="h-40 overflow-hidden relative">
              <img 
                src={theme.heroImage} 
                alt={theme.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-bold text-green-700 shadow-sm">
                {theme.savingsText}
              </div>
            </div>

            <div className="p-4">
              <h3 className="font-bold text-lg text-pelago-dark mb-1">{theme.title}</h3>
              <p className="text-sm text-gray-500 mb-4 line-clamp-2">{theme.subtitle}</p>
              
              <div className="flex -space-x-2 mb-4">
                {theme.products.slice(0, 3).map((p, i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-white overflow-hidden bg-gray-200">
                    <img src={p.image} alt="" className="w-full h-full object-cover" />
                  </div>
                ))}
                {theme.products.length > 3 && (
                   <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-500">
                     +{theme.products.length - 3}
                   </div>
                )}
              </div>

              <div className="w-full py-2 text-center text-sm font-semibold text-pelago-dark bg-pelago-lime/20 rounded-lg group-hover:bg-pelago-lime transition-colors">
                View Bundle
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThematicSection;