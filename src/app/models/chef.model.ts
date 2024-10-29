// src/app/models/chef.model.ts
export interface Chef {
    id: string;
    name: string;
    specialty: string; // Main cuisine type
    rating: number; // Average rating from users
    bio?: string;
    profilePictureUrl?: string;
  }
  