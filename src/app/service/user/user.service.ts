// src/app/services/user/user.service.ts
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private firestore: AngularFirestore) {}

  // Retrieve user's role by user ID
  getUserRole(userId: string): Observable<string> {
    return this.firestore.collection<User>('users').doc(userId).valueChanges().pipe(
      map(user => user?.role ?? 'user') // Return 'user' if role is not found
    );
  }

  // Retrieve user's preferences by user ID
  getUserPreferences(userId: string): Observable<string[]> {
    return this.firestore.collection<User>('users').doc(userId).valueChanges().pipe(
      map(user => user?.preferences ?? []) // Return empty array if no preferences
    );
  }

    // Retrieve user profile by user ID (includes avatar)
    getUserProfile(userId: string): Observable<User | null> {
      return this.firestore.collection<User>('users').doc(userId).valueChanges().pipe(
        map(user => user ?? null)
      );
    }
}
