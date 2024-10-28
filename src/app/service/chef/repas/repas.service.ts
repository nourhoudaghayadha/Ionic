import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RepasService {
  private apiUrl = 'https://ionicproject-5c0be-default-rtdb.firebaseio.com/'; // Assurez-vous que cette URL est correcte
  
  constructor(private http: HttpClient) { }

  // Méthode pour ajouter un repas dans Firebase
  addRepas(repasData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/chefs.json`, repasData);
  }

  // Méthode pour obtenir la liste de tous les repas
  getRepas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/chefs.json`);
  }

  // Méthode pour obtenir un repas par son ID
  getRepasById(repasId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/repas/${repasId}.json`);
  }

  // Méthode pour mettre à jour un repas
  updateRepas(repasId: string, repasData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/repas/${repasId}.json`, repasData);
  }

  // Méthode pour supprimer un repas
  deleteRepas(repasId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/repas/${repasId}.json`);
  }
}
