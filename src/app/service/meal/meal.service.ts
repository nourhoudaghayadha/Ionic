import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Food } from '../../../app/models/food.model'; // Assurez-vous que ce modèle existe

@Injectable({
  providedIn: 'root'
})
export class MealService {
  private apiUrl = 'https://ionicproject-5c0be-default-rtdb.firebaseio.com'; // URL de votre API Firebase
  private foods: Food[] = []; // Propriété pour stocker les aliments

  constructor(private http: HttpClient) { }

  // Méthode pour enregistrer les filtres
  saveFilters(filters: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/filters.json`, filters);
  }

  // Méthode pour obtenir un repas par son ID
  getMealById(mealTypeId: string): Observable<Food> {
    return this.http.get<Food>(`${this.apiUrl}/meals/${mealTypeId}.json`); // Correction ici
  }

  // Nouvelle méthode pour obtenir tous les repas
  getAllMeals(): Observable<Food[]> {
    return this.http.get<Food[]>(`${this.apiUrl}/meals.json`).pipe( // Correction ici
      map(response => {
        return response; // Vérifiez que le format de réponse est correct
      })
    );
  }
}
