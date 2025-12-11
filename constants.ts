import { BundleTheme } from "./types";

export const THEMATIC_BUNDLES: BundleTheme[] = [
  {
    id: "theme-singapore",
    title: "First Time in Singapore",
    subtitle: "Essential experiences for first-time visitors. See the best of Singapore.",
    heroImage: "https://images.unsplash.com/photo-1565967511849-76a60a516170?auto=format&fit=crop&q=80&w=800",
    savingsText: "Save up to 18%",
    products: [
      {
        id: "sg-1",
        title: "Gardens by the Bay - Cloud Forest & Flower Dome",
        description: "Visit the iconic cooled conservatories and Supertrees.",
        price: 53,
        badge: "Must Do",
        image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&q=80&w=400",
        rating: 4.8,
        reviewCount: 12500,
        isOpenDated: true,
        options: [
          { id: "sg-1-a", title: "Double Conservatories", price: 53, unitName: "Adult" },
          { id: "sg-1-b", title: "Floral Fantasy Only", price: 20, unitName: "Adult" }
        ]
      },
      {
        id: "sg-2",
        title: "Marina Bay Sands SkyPark Observation Deck",
        description: "Panoramic views of the city skyline.",
        price: 32,
        badge: "Iconic View",
        image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&q=80&w=400",
        rating: 4.6,
        reviewCount: 8400,
        isOpenDated: true,
        options: [
          { id: "sg-2-a", title: "Standard Entry", price: 32, unitName: "Adult" },
          { id: "sg-2-b", title: "Sunset Entry (5PM-7PM)", price: 40, unitName: "Adult" }
        ]
      },
      {
        id: "sg-3",
        title: "Singapore Cable Car Sky Pass",
        description: "Ride above the harbor to Sentosa Island.",
        price: 35,
        badge: "Scenic",
        image: "https://images.unsplash.com/photo-1625807663435-090c25348888?auto=format&fit=crop&q=80&w=400",
        rating: 4.5,
        reviewCount: 3200,
        isOpenDated: true,
        options: [
            { id: "sg-3-a", title: "Round Trip", price: 35, unitName: "Adult" },
            { id: "sg-3-b", title: "Unlimited Day Pass", price: 45, unitName: "Adult" }
        ]
      },
      {
        id: "sg-4",
        title: "S.E.A. Aquarium™ Entry Ticket",
        description: "Explore the marine realm of 100,000 marine animals.",
        price: 43,
        badge: "Family",
        image: "https://images.unsplash.com/photo-1582298538104-fe2e74c27f59?auto=format&fit=crop&q=80&w=400",
        rating: 4.7,
        reviewCount: 5100,
        isOpenDated: false,
        options: [
            { id: "sg-4-a", title: "One-Day Ticket", price: 43, unitName: "Adult" },
            { id: "sg-4-b", title: "Behind The Panel Tour", price: 80, unitName: "Adult" }
        ]
      }
    ]
  },
  {
    id: "theme-food",
    title: "Food Hunter",
    subtitle: "Discover Singapore's culinary delights. Taste the best local and international cuisines.",
    heroImage: "https://images.unsplash.com/photo-1552590635-27c2c2128abf?auto=format&fit=crop&q=80&w=800",
    savingsText: "Save up to 15%",
    products: [
      {
        id: "food-1",
        title: "Chinatown Hawker Food Tasting Tour",
        description: "Sample 8+ local dishes with a guide.",
        price: 65,
        badge: "Local Fav",
        image: "https://images.unsplash.com/photo-1567332304881-1925b3978ffc?auto=format&fit=crop&q=80&w=400",
        rating: 4.9,
        reviewCount: 420,
        isOpenDated: false,
        options: [
            { id: "f1-a", title: "Standard Tour", price: 65, unitName: "Pax" },
            { id: "f1-b", title: "Private Tour", price: 120, unitName: "Pax" }
        ]
      },
      {
        id: "food-2",
        title: "Peranakan Cultural Cooking Class",
        description: "Learn to cook traditional Nyonya dishes.",
        price: 120,
        badge: "Workshop",
        image: "https://images.unsplash.com/photo-1556910103-1c02745a30bf?auto=format&fit=crop&q=80&w=400",
        rating: 4.8,
        reviewCount: 150,
        isOpenDated: false,
        options: [
            { id: "f2-a", title: "Morning Class (includes market)", price: 120, unitName: "Pax" },
            { id: "f2-b", title: "Afternoon Class", price: 100, unitName: "Pax" }
        ]
      },
      {
        id: "food-3",
        title: "Singapore River Dining Cruise",
        description: "Enjoy dinner while cruising the historic river.",
        price: 58,
        badge: "Romantic",
        image: "https://images.unsplash.com/photo-1559869277-c93d8b28a272?auto=format&fit=crop&q=80&w=400",
        rating: 4.4,
        reviewCount: 890,
        isOpenDated: false,
        options: [
            { id: "f3-a", title: "Dinner Cruise", price: 58, unitName: "Pax" },
            { id: "f3-b", title: "Lunch Cruise", price: 48, unitName: "Pax" }
        ]
      },
      {
        id: "food-4",
        title: "Michelin Guide Street Food Tour",
        description: "Taste Michelin-rated hawker stalls.",
        price: 85,
        badge: "Best Seller",
        image: "https://images.unsplash.com/photo-1606850462039-4467c69992f4?auto=format&fit=crop&q=80&w=400",
        rating: 4.7,
        reviewCount: 310,
        isOpenDated: false,
        options: [
            { id: "f4-a", title: "Join-in Tour", price: 85, unitName: "Pax" }
        ]
      }
    ]
  }
];