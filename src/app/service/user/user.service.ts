// src/app/services/user.service.ts
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/app/models/user.model';
import { AuthenticationService } from '../auth/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private firestore: AngularFirestore, private authService: AuthenticationService) {}

  getUserRole(userId: string): Observable<string> {
    return this.firestore.collection<User>('users').doc(userId).valueChanges().pipe(
      map(user => user?.role || 'user')
    );
  }

  getUserPreferences(userId: string): Observable<string[]> {
    return this.firestore.collection<User>('users').doc(userId).valueChanges().pipe(
      map(user => user?.preferences || [])
    );
  }
}
