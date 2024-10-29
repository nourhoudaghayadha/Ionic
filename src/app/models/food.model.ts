// src/app/models/food.model.ts
export interface Food {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    chefId: string; // Links to the chef who posted it
    category: string; // e.g., "Italian", "Vegan"
    dietaryTags?: string[]; // e.g., ["Vegetarian", "Gluten-Free"]
    rating?: number; // Average rating
  }
  