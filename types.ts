export interface ProductOption {
  id: string;
  title: string;
  description?: string;
  price: number;
  unitName: string; // e.g., "Adult", "Pax", "Ticket", "Child"
}

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number; // This will now act as "Starting from" price
  image: string;
  badge?: string;
  rating?: number;
  reviewCount?: number;
  
  // Date Selection features
  isOpenDated?: boolean;
  selectedDate?: string | null;
  chooseLater?: boolean;

  // Option & Quantity features
  options?: ProductOption[];
  selectedOptionId?: string;
  quantity?: number;
}

export interface BundleTheme {
  id: string;
  title: string;
  subtitle: string;
  heroImage: string;
  savingsText: string;
  products: Product[];
}

export interface UserPreferences {
  destination: string;
  companions: string;
  interests: string[];
}

export enum DiscountTier {
  NONE = 0,
  TIER_1 = 0.05, // 2 items
  TIER_2 = 0.08, // 3 items
  TIER_3 = 0.12  // 4+ items
}