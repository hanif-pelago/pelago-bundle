import { GoogleGenAI, Type, SchemaType } from "@google/genai";
import { Product, UserPreferences } from "../types";

// Helper to get a random image based on keywords
const getPlaceholderImage = (keyword: string, index: number) => {
  const width = 400;
  const height = 300;
  return `https://picsum.photos/${width}/${height}?random=${index + 10}`;
};

export const generateDynamicBundle = async (prefs: UserPreferences): Promise<{ title: string; reason: string; products: Product[] }> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key is missing");
  }

  const ai = new GoogleGenAI({ apiKey });

  const prompt = `
    Create a personalized travel bundle for a trip to ${prefs.destination}.
    Companions: ${prefs.companions}.
    Interests: ${prefs.interests.join(", ")}.

    Generate 5 distinct travel activities/products.
    
    CRITICAL REQUIREMENT:
    - Exactly ONE product must be "Open Dated". Set 'isOpenDated' to true.
    - Other 4 products are date-specific.
    - Each product must have at least 2 distinct 'options' (e.g., Ticket Types).
      Examples: "Standard Entry", "Express Pass", "VIP Access", "Guided Tour".
      Unit names should be relevant (e.g., "Adult", "Pax", "Group").

    The output must be a JSON object containing:
    1. 'title': Bundle name.
    2. 'reason': Why it fits.
    3. 'products': Array of 5 products with:
       - 'title', 'description', 'badge', 'rating', 'reviewCount', 'isOpenDated'
       - 'price': Base price (cheapest option).
       - 'options': Array of options, each having 'title', 'price', 'unitName'.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            reason: { type: Type.STRING },
            products: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  description: { type: Type.STRING },
                  price: { type: Type.NUMBER },
                  badge: { type: Type.STRING },
                  rating: { type: Type.NUMBER },
                  reviewCount: { type: Type.INTEGER },
                  isOpenDated: { type: Type.BOOLEAN },
                  options: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        title: { type: Type.STRING },
                        price: { type: Type.NUMBER },
                        unitName: { type: Type.STRING }
                      },
                      required: ["title", "price", "unitName"]
                    }
                  }
                },
                required: ["title", "description", "price", "badge", "rating", "reviewCount", "isOpenDated", "options"]
              }
            }
          },
          required: ["title", "reason", "products"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from Gemini");

    const data = JSON.parse(text);

    // Hydrate
    const products: Product[] = data.products.map((p: any, index: number) => ({
      ...p,
      id: `dyn-${index}`,
      image: getPlaceholderImage(prefs.destination, index),
      isOpenDated: p.isOpenDated || false,
      options: p.options.map((opt: any, optIdx: number) => ({
        ...opt,
        id: `opt-${index}-${optIdx}`
      }))
    }));

    return {
      title: data.title,
      reason: data.reason,
      products: products
    };

  } catch (error) {
    console.error("Gemini API Error:", error);
    // Fallback
    return {
      title: `${prefs.destination} Essentials`,
      reason: "Based on your preferences (Fallback)",
      products: [
        {
          id: "fb-1",
          title: "City Sightseeing Bus Tour",
          description: "Explore the city highlights at your own pace.",
          price: 45,
          badge: "Best Seller",
          image: "https://picsum.photos/400/300?random=100",
          rating: 4.5,
          reviewCount: 1200,
          isOpenDated: true,
          options: [
            { id: "o1", title: "24-Hour Pass", price: 45, unitName: "Adult" },
            { id: "o2", title: "48-Hour Pass", price: 65, unitName: "Adult" }
          ]
        },
        {
          id: "fb-2",
          title: "Local Food Tasting Adventure",
          description: "Sample the best local dishes with a guide.",
          price: 85,
          badge: "Foodie Pick",
          image: "https://picsum.photos/400/300?random=101",
          rating: 4.8,
          reviewCount: 340,
          isOpenDated: false,
          options: [
            { id: "o3", title: "Morning Tour", price: 85, unitName: "Pax" },
            { id: "o4", title: "Evening Tour", price: 95, unitName: "Pax" }
          ]
        }
      ]
    };
  }
};