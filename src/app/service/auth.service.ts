// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { UserService } from './user/user.service';
import { Observable, of } from 'rxjs';
import { switchMap, catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private afAuth: AngularFireAuth,
    private userService: UserService,
    private router: Router

  ) {}

  // Retrieve the user's role or default to 'user'
  getUserRole(): Observable<string> {
    return this.afAuth.authState.pipe(
      switchMap(user => 
        user ? this.userService.getUserRole(user.uid) : of('user')
      ),
      catchError(error => {
        console.error('Error retrieving user role:', error);
        return of('user'); // Default on error
      })
    );
  }

  // Get current user ID or return null
  getCurrentUserId(): Observable<string | null> {
    return this.afAuth.authState.pipe(
      map(user => user?.uid ?? null)
    );
  }

  // Sign out the user
 // src/app/services/auth.service.ts
async logout(): Promise<void> {
  try {
    await this.afAuth.signOut();
    this.router.navigate(['/login'], { replaceUrl: true }); // Clears history stack
  } catch (error) {
    console.error('Error during logout:', error);
    throw error;
  }
}


  // Retrieve the user's display name or empty string
  getUserName(): Observable<string> {
    return this.afAuth.authState.pipe(
      map(user => user?.displayName ?? '')
    );
  }
}
