import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MealService {

  private apiUrl = 'https://ionicproject-5c0be-default-rtdb.firebaseio.com';

  constructor(private http: HttpClient) { }

  saveFilters(filters: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/filters.json`, filters);
  }

  // Méthode pour obtenir un repas par son ID
  getMealById(MealTypeId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/user/${MealTypeId}.json`);
  }


}
