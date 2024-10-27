import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore'; 
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RepasService {

  constructor(private firestore: AngularFirestore) { }

  // Méthode pour ajouter un repas dans Firestore
  addRepas(repasData: any): Promise<void> {
    const repasId = this.firestore.createId(); // Créer un identifiant unique pour chaque repas
    return this.firestore.collection('repas').doc(repasId).set({
      id: repasId,
       // Ajouter les données du repas
    });
  }

  // Méthode pour obtenir la liste de tous les repas
  getRepas(): Observable<any[]> {
    return this.firestore.collection('repas').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id,  }; // Retourner les données du repas avec l'ID
      }))
    );
  }

  // Méthode pour obtenir un repas par son ID
  getRepasById(repasId: string): Observable<any> {
    return this.firestore.collection('repas').doc(repasId).snapshotChanges().pipe(
      map(a => {
        const data = a.payload.data();
        const id = a.payload.id;
        return { id, }; // Retourner les données du repas avec l'ID
      })
    );
  }

  // Méthode pour mettre à jour un repas
  updateRepas(repasId: string, repasData: any): Promise<void> {
    return this.firestore.collection('repas').doc(repasId).update(repasData);
  }

  // Méthode pour supprimer un repas
  deleteRepas(repasId: string): Promise<void> {
    return this.firestore.collection('repas').doc(repasId).delete();
  }
}
