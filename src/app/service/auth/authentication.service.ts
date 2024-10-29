// src/app/services/authentication.service.ts
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {}

  // Register a new user and store their data in Firestore
  async register(name: string, email: string, password: string, role: string) {
    try {
      const res = await this.afAuth.createUserWithEmailAndPassword(email, password);
      if (res.user) {
        await this.firestore.collection('users').doc(res.user.uid).set({
          uid: res.user.uid,
          email,
          name,
          role
        });
        return res;
      }
      throw new Error('User registration failed');
    } catch (error) {
      console.error('Error during registration:', error);
      throw error;
    }
  }

  // Log in an existing user
  async loginUser(email: string, password: string) {
    try {
      return await this.afAuth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  }

  // Send a password reset email
  async resetPassword(email: string) {
    try {
      await this.afAuth.sendPasswordResetEmail(email);
    } catch (error) {
      console.error('Error during password reset:', error);
      throw error;
    }
  }

  // Sign out the current user
  async signOut() {
    try {
      await this.afAuth.signOut();
    } catch (error) {
      console.error('Error during sign-out:', error);
      throw error;
    }
  }

  // Retrieve all users from Firestore
  getAllUsers(): Observable<any[]> {
    return this.firestore.collection('users').valueChanges();
  }
}
