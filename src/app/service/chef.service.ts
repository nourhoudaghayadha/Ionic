// src/app/services/chef.service.ts
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Chef } from '../models/chef.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChefService {
  constructor(private firestore: AngularFirestore) {}

  getTopChefs(): Observable<Chef[]> {
    return this.firestore.collection<Chef>('chefs', ref => ref.orderBy('rating', 'desc').limit(5)).valueChanges();
  }

  getChefById(chefId: string): Observable<Chef | undefined> {
    return this.firestore.collection<Chef>('chefs').doc(chefId).valueChanges();
  }
}
