import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, finalize, map, switchMap } from 'rxjs';
import { Food } from '../models/food.model';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AuthService } from './auth.service';

export interface Rating {
  foodId: string;
  ratingValue: number;
}

export interface Order {
  foodId: string;
  name: string;
  quantity: number;
  details: string; // ou tout autre détail spécifique que vous souhaitez ajouter
}

@Injectable({
  providedIn: 'root',
})
export class FoodService {
  private apiUrl = 'https://ionicproject-5c0be-default-rtdb.firebaseio.com';

  constructor(
    private http: HttpClient,
    private storage: AngularFireStorage,
    private authService: AuthService
  ) {}






  
  getLatestChefFoodItems(chefId: string): Observable<Food[]> {
    const url = `${this.apiUrl}/food.json?orderBy="chefId"&equalTo="${chefId}"`;
    return this.http.get<{ [key: string]: Food }>(url).pipe(
      map((response) =>
        response ? Object.entries(response).map(([id, food]) => ({ ...food, id })) : []
      )
    );
  }

  uploadImage(file: File): Observable<string> {
    const filePath = `food-images/${file.name}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    return new Observable((observer) => {
      task.snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(
            (url) => {
              observer.next(url);
              observer.complete();
            },
            (error) => observer.error(error)
          );
        })
      ).subscribe();
    });
  }

  addFood(foodData: Omit<Food, 'id'>): Observable<string> {
    return this.http
      .post<{ name: string }>(`${this.apiUrl}/food.json`, foodData)
      .pipe(map((response) => response.name));
  }

  // Retrieve a list of food items with optional filters
  getFood(filters?: any): Observable<Food[]> {
    let queryUrl = `${this.apiUrl}/food.json`;

    if (filters) {
      const queryParams = [];

      if (filters.dietaryTags) {
        queryParams.push(
          `orderBy="dietaryTags"&equalTo="${filters.dietaryTags}"`
        );
      }

      if (filters.priceRange) {
        queryParams.push(
          `orderBy="price"&startAt=${filters.priceRange.min}&endAt=${filters.priceRange.max}`
        );
      }

      if (queryParams.length > 0) {
        queryUrl += `?${queryParams.join('&')}`;
      }
    }

    return this.http.get<{ [key: string]: Food }>(queryUrl).pipe(
      map((response) =>
        Object.keys(response).map((key) => ({ ...response[key], id: key }))
      )
    );
  }

  // Retrieve a food item by its ID
  getFoodById(foodId: string): Observable<Food> {
    return this.http.get<Food>(`${this.apiUrl}/food/${foodId}.json`).pipe(
      map((response) => ({ ...response, id: foodId }))
    );
  }

// Update a food item
updateFood(foodId: string, foodData: Omit<Food, 'id'>): Observable<any> {
  return this.http.put(`${this.apiUrl}/food/${foodId}.json`, foodData);
}

  // Delete a food item
  deleteFood(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/food/${id}.json`);
  }

  // Retrieve featured food items
  getFeaturedFoodItems(): Observable<Food[]> {
    return this.getFood();
  }

  // Retrieve recommended food items based on user preferences
  getRecommendedFoodItems(userPreferences: string[]): Observable<Food[]> {
    return this.getFood({ dietaryTags: userPreferences });
  }

  // Method to add an order
  addOrder(foodId: string, name: string, quantity: number, details: string): Observable<any> {
    const orderData: Order = { foodId, name, quantity, details };
    return this.http.post(`${this.apiUrl}/orders.json`, orderData);
  }

  // Method to add ratings to food items
  addRating(foodId: string, ratingValue: number): Observable<any> {
    const ratingData: Rating = { foodId, ratingValue };
    return this.http.post(`${this.apiUrl}/ratings.json`, ratingData);
  }
  
  // Method to get the average rating of a food item
  getFoodWithRating(foodId: string): Observable<Food> {
    return this.http.get<Food>(`${this.apiUrl}/food/${foodId}.json`).pipe(
      map((food) => ({
        ...food,
        id: foodId,
      })),
      switchMap((food) =>
        this.calculateAverageRating(foodId).pipe(
          map((rating) => ({
            ...food,
            rating,
          }))
        )
      )
    );
  }
   // Méthode pour récupérer toutes les commandes
   getOrders(): Observable<Order[]> {
    return this.http.get<{ [key: string]: Order }>(`${this.apiUrl}/orders.json`).pipe(
      map(response => 
        response ? Object.keys(response).map(key => ({ id: key, ...response[key] })) : []
      )
    );
  }

  // Méthode pour supprimer une commande par ID
  deleteOrder(orderId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/orders/${orderId}.json`);
  }
  
  // Helper method to calculate average rating
  private calculateAverageRating(foodId: string): Observable<number> {
    return this.http
      .get<{ [key: string]: Rating }>(`${this.apiUrl}/ratings.json?orderBy="foodId"&equalTo="${foodId}"`)
      .pipe(
        map((ratings) => {
          const ratingValues = Object.values(ratings).map((r) => r.ratingValue);
          const sum = ratingValues.reduce((acc, val) => acc + val, 0);
          return ratingValues.length > 0 ? sum / ratingValues.length : 0;
        })
      );
  }
  
}
