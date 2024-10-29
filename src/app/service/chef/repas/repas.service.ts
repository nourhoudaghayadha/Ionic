import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RepasService {
  private apiUrl = 'https://ionicproject-5c0be-default-rtdb.firebaseio.com';

  constructor(private http: HttpClient) { }

  // Method to add a meal to Firebase and retrieve the ID of the created document
  addRepas(repasData: any): Observable<string> {
    return this.http.post<{ name: string }>(`${this.apiUrl}/chefs.json`, repasData).pipe(
      map(response => response.name) // Retrieve the `name` ID of the document
    );
  }

  // Method to get the list of meals with optional filters
  getRepas(filters?: any): Observable<any[]> {
    let queryUrl = `${this.apiUrl}/chefs.json`;

    // Append filters to the query URL if they exist
    if (filters) {
      const queryParams = [];

      // Example: if filtering by meal type
      if (filters.meal_type) {
        queryParams.push(`orderBy="meal_type"&equalTo="${filters.meal_type}"`);
      }

      // Add more filters as needed
      // For example, filtering by a price range
      if (filters.priceRange) {
        queryParams.push(`orderBy="price"&startAt=${filters.priceRange.min}&endAt=${filters.priceRange.max}`);
      }

      // Construct the query string
      if (queryParams.length > 0) {
        queryUrl += `?${queryParams.join('&')}`;
      }
    }

    return this.http.get<any[]>(queryUrl);
  }

  // Method to get a meal by its ID
  getRepasById(repasId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/chefs/${repasId}.json`);
  }

  // Method to update a meal
  updateRepas(repasId: string, repasData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/chefs/${repasId}.json`, repasData);
  }

  // Method to delete a meal
  deleteRepas(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/chefs/${id}.json`);
  }
}
