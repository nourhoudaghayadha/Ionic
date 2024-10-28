import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RepasService {
  private apiUrl = 'https://ionicproject-5c0be-default-rtdb.firebaseio.com';

  constructor(private http: HttpClient) { }

  // Méthode pour ajouter un repas dans Firebase et récupérer l'ID du document créé
  addRepas(repasData: any): Observable<string> {
    return this.http.post<{ name: string }>(`${this.apiUrl}/chefs.json`, repasData).pipe(
      map(response => response.name) // Récupère l'ID `name` du document
    );
  }

  // Méthode pour obtenir la liste de tous les repas
  getRepas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/chefs.json`);
  }

  // Méthode pour obtenir un repas par son ID
  getRepasById(repasId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/chefs/${repasId}.json`);
  }

  // Méthode pour mettre à jour un repas
  updateRepas(repasId: string, repasData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/chefs/${repasId}.json`, repasData);
  }

  // Méthode pour supprimer un repas
  deleteRepas(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/chefs/${id}.json`);
  }
}
