// src/app/models/food.model.ts
export interface Food {
  id: string;              // ID unique du repas
  name: string;            // Nom du repas
  description: string;     // Description du repas
  price: number;           // Prix du repas
  imageUrl: string;        // URL de l'image du repas
  chefId: string;          // ID du chef qui a posté le repas
  category: string;        // Catégorie (ex : "Italien", "Végétalien")
  dietaryTags?: string[];  // Tags diététiques (ex : ["Végétarien", "Sans Gluten"])
  rating?: number;         // Évaluation moyenne
  quantity: number;        // Quantité disponible
}
