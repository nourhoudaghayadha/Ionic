// src/app/models/user.model.ts
export interface User {
    id: string;
    name: string;
    email: string;
    role: 'user' | 'chef';
    preferences?: string[]; // User's food preferences for recommendations
  }
  