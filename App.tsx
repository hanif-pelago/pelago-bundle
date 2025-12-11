import React, { useState } from 'react';
import { Product, BundleTheme, UserPreferences } from './types';
import { generateDynamicBundle } from './services/geminiService';
import PreferencesForm from './components/PreferencesForm';
import BundleContainer from './components/BundleContainer';
import ThematicSection from './components/ThematicSection';
import HomePage from './components/HomePage';
import BookingsPage from './components/BookingsPage';
import BookingDetailsPage from './components/BookingDetailsPage';
import CheckoutPage from './components/CheckoutPage';
import PaymentPage from './components/PaymentPage';
import BookingStatusPage from './components/BookingStatusPage';
import Logo from './components/Logo';
import { THEMATIC_BUNDLES } from './constants';
import { Sparkles, ArrowLeft } from 'lucide-react';

type ViewState = 'home' | 'form' | 'results' | 'bookings' | 'booking-details' | 'thematic-bundle' | 'checkout' | 'payment' | 'status';

function App() {
  const [view, setView] = useState<ViewState>('home');
  const [loading, setLoading] = useState(false);
  
  // Dynamic Bundle State
  const [dynamicBundle, setDynamicBundle] = useState<{title: string, reason: string, products: Product[]} | null>(null);
  
  // Thematic State
  const [selectedTheme, setSelectedTheme] = useState<BundleTheme | null>(null);

  // Checkout State
  const [checkoutData, setCheckoutData] = useState<{
    items: Product[]; 
    total: number;
    originalTotal: number; // To track savings
  } | null>(null);

  // Purchased Bundle State
  const [purchasedBundle, setPurchasedBundle] = useState<{
    title: string;
    items: Product[];
    total: number;
    image: string;
  } | null>(null);

  const handleStartBundle = () => {
    setView('form');
  };

  const handleViewTheme = (theme: BundleTheme) => {
    setSelectedTheme(theme);
    setView('thematic-bundle');
    window.scrollTo(0, 0);
  };

  const handleSelectThemeFromHome = (themeId: string) => {
    // Find theme from constants
    const theme = THEMATIC_BUNDLES.find(t => t.id === themeId);
    if (theme) {
      // If selecting from home, clear any dynamic bundle state to avoid confusion in back navigation
      setDynamicBundle(null);
      handleViewTheme(theme);
    } else {
      // Fallback for demo purposes
      setDynamicBundle(null);
      handleViewTheme(THEMATIC_BUNDLES[0]);
    }
  };

  const handlePreferencesSubmit = async (prefs: UserPreferences) => {
    setLoading(true);
    try {
      const bundle = await generateDynamicBundle(prefs);
      setDynamicBundle(bundle);
      setView('results');
    } catch (e) {
      console.error(e);
      alert("Something went wrong generating your bundle. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (items: Product[], total: number) => {
    // Calculate original total to pass to checkout for savings display
    const originalTotal = items.reduce((sum, p) => {
       const option = p.options?.find(o => o.id === p.selectedOptionId);
       const price = option ? option.price : p.price;
       return sum + (price * (p.quantity || 1));
    }, 0);

    setCheckoutData({
      items,
      total,
      originalTotal
    });
    setView('checkout');
    window.scrollTo(0, 0);
  };

  const handleProceedToPayment = () => {
    setView('payment');
    window.scrollTo(0, 0);
  };

  const handlePurchaseComplete = () => {
    if (!checkoutData) return;

    // Determine title and image based on context
    let title = "Custom Bundle";
    let image = "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=400";

    if (selectedTheme) {
      title = selectedTheme.title;
      image = selectedTheme.heroImage;
    } else if (dynamicBundle) {
      title = dynamicBundle.title;
      if (checkoutData.items.length > 0) image = checkoutData.items[0].image;
    }

    setPurchasedBundle({
      title,
      items: checkoutData.items,
      total: checkoutData.total,
      image
    });

    // DO NOT clear checkoutData yet, we need it for the Status Page
    // But we can clear the selection contexts
    setSelectedTheme(null);
    setDynamicBundle(null);
    
    setView('status');
    window.scrollTo(0, 0);
  };

  const handleFinishStatus = () => {
    setCheckoutData(null); // Clear checkout data now
    setView('bookings');
    window.scrollTo(0, 0);
  };

  const handleViewBookingDetails = () => {
    setView('booking-details');
  };

  const handleUpdatePurchasedProductDate = (productId: string, date: string) => {
    if (!purchasedBundle) return;
    
    const updatedItems = purchasedBundle.items.map(p => {
      if (p.id === productId) {
        return { ...p, selectedDate: date, chooseLater: false };
      }
      return p;
    });

    setPurchasedBundle({
      ...purchasedBundle,
      items: updatedItems
    });
  };

  const goBack = () => {
    if (view === 'results') {
      setView('form'); // Back to edit preferences
    } else if (view === 'form') {
      setView('home'); // Back to home
    } else if (view === 'bookings') {
      setView('home');
    } else if (view === 'booking-details') {
      setView('bookings');
    } else if (view === 'thematic-bundle') {
      if (dynamicBundle) {
        // If we have a dynamic bundle in state, assume we navigated here from the Results page bottom section
        setView('results');
      } else {
        // Otherwise we likely came from Home
        setView('home');
      }
    } else if (view === 'checkout') {
      // Go back to where we came from (Dynamic results or Thematic page)
      if (selectedTheme) {
        setView('thematic-bundle');
      } else if (dynamicBundle) {
        setView('results');
      } else {
        setView('home');
      }
    } else if (view === 'payment') {
      setView('checkout');
    }
  };

  const resetToHome = () => {
    setView('home');
    setDynamicBundle(null);
    setSelectedTheme(null);
    setCheckoutData(null);
  };

  return (
    <div className="min-h-screen bg-pelago-soft font-sans">
      
      {/* Home Page View */}
      {view === 'home' && (
        <HomePage 
          onStartBundle={handleStartBundle} 
          onSelectTheme={handleSelectThemeFromHome} 
        />
      )}

      {/* Checkout Page View */}
      {view === 'checkout' && checkoutData && (
        <CheckoutPage 
          items={checkoutData.items}
          total={checkoutData.total}
          originalTotal={checkoutData.originalTotal}
          onBack={goBack}
          onContinue={handleProceedToPayment}
        />
      )}

      {/* Payment Page View */}
      {view === 'payment' && checkoutData && (
        <PaymentPage 
          items={checkoutData.items}
          total={checkoutData.total}
          onBack={goBack}
          onPay={handlePurchaseComplete}
        />
      )}

      {/* Status Page View */}
      {view === 'status' && checkoutData && (
        <BookingStatusPage 
          items={checkoutData.items}
          onViewOrderDetails={handleFinishStatus}
        />
      )}

      {/* Bookings Page View */}
      {view === 'bookings' && (
        <BookingsPage 
          bundle={purchasedBundle} 
          onBack={resetToHome} 
          onViewDetails={handleViewBookingDetails}
        />
      )}

      {/* Booking Details Page View */}
      {view === 'booking-details' && purchasedBundle && (
        <BookingDetailsPage 
          bundle={purchasedBundle}
          onBack={goBack}
          onUpdateProductDate={handleUpdatePurchasedProductDate}
        />
      )}

      {/* Bundle Flow Views (Form, Results, Thematic Bundle Page) */}
      {(view === 'form' || view === 'results' || view === 'thematic-bundle') && (
        <>
          <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100">
            <div className="max-w-3xl mx-auto px-4 h-16 flex items-center justify-between">
              <div className="flex items-center gap-4">
                 <button onClick={goBack} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                   <ArrowLeft size={20} />
                 </button>
                 <div onClick={resetToHome} className="cursor-pointer">
                   <Logo className="h-8 md:h-10 w-auto" />
                 </div>
              </div>
              
              {view === 'results' && (
                <div className="text-xs font-medium px-2 py-1 bg-gray-100 rounded text-gray-600 hidden md:block">
                  Beta
                </div>
              )}
            </div>
          </header>

          <main className="max-w-3xl mx-auto px-4 pb-20">
            {view === 'form' && (
              <PreferencesForm onSubmit={handlePreferencesSubmit} isLoading={loading} />
            )}

            {view === 'results' && dynamicBundle && (
              <div className="animate-fade-in pt-6 md:pt-8">
                
                {/* Dynamic Bundle Header */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-pelago-dark text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider flex items-center gap-1">
                      <Sparkles size={10} className="text-pelago-lime" />
                      Recommended for You
                    </span>
                  </div>
                  <h1 className="text-2xl md:text-3xl font-bold text-pelago-dark mb-2">
                    {dynamicBundle.title}
                  </h1>
                  <p className="text-sm md:text-base text-gray-600 bg-white p-3 rounded-lg border border-gray-100 inline-block shadow-sm">
                    "{dynamicBundle.reason}"
                  </p>
                </div>

                {/* Dynamic Product List with integrated progress bar */}
                <BundleContainer 
                  products={dynamicBundle.products} 
                  contextType="dynamic" 
                  onAddToCart={handleAddToCart}
                />

                {/* Thematic Exploration */}
                <ThematicSection onSelectTheme={handleViewTheme} />

              </div>
            )}

            {/* Thematic Bundle Page View */}
            {view === 'thematic-bundle' && selectedTheme && (
               <div className="animate-fade-in pt-6 md:pt-8">
                  {/* Hero Image Card */}
                  <div className="relative w-full h-56 md:h-64 rounded-2xl overflow-hidden mb-6 shadow-md border border-gray-100">
                     <img 
                        src={selectedTheme.heroImage} 
                        alt={selectedTheme.title} 
                        className="w-full h-full object-cover" 
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                     <div className="absolute bottom-0 left-0 p-6 text-white">
                        <div className="inline-block px-2 py-0.5 bg-pelago-lime text-pelago-dark text-[10px] font-bold uppercase rounded mb-2">
                           Editorial Pick
                        </div>
                        <h1 className="text-2xl md:text-3xl font-bold">{selectedTheme.title}</h1>
                        <p className="text-white/90 text-sm md:text-base mt-1">{selectedTheme.subtitle}</p>
                     </div>
                  </div>

                  {/* Bundle List with integrated progress bar */}
                  <BundleContainer 
                     products={selectedTheme.products} 
                     contextType="thematic"
                     onAddToCart={handleAddToCart}
                  />
               </div>
            )}
          </main>
        </>
      )}
    </div>
  );
}

export default App;