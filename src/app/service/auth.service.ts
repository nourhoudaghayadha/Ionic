// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UserService } from './user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private userService: UserService
  ) {}

  async getUserRole(): Promise<string> {
    const user = await this.afAuth.currentUser;
    if (user) {
      const role = await this.userService.getUserRole(user.uid).toPromise();
      return role || 'hha';
    }
    return 'user';
  }

  async getCurrentUserId(): Promise<string | null> {
    const user = await this.afAuth.currentUser;
    return user ? user.uid : null;
  }

  async logout(): Promise<void> {
    return this.afAuth.signOut();
  }

  async getUserName(): Promise<string> {
    const user = await this.afAuth.currentUser;
    return user?.displayName || '';
  }
}
