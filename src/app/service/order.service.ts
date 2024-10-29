// src/app/services/order.service.ts
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private firestore: AngularFirestore) {}

  getUserRecentOrders(userId: string): Observable<Order[]> {
    return this.firestore.collection<Order>('orders', ref => ref.where('userId', '==', userId).orderBy('date', 'desc')).valueChanges();
  }

  reorder(order: Order): Promise<void> {
    const newOrder: Order = {
      ...order,
      id: this.firestore.createId(),
      date: new Date()
    };
    return this.firestore.collection('orders').doc(newOrder.id).set(newOrder);
  }
}
