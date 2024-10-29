import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(public ngFireAuth : AngularFireAuth,  
    private afAuth: AngularFireAuth,  
    private firestore: AngularFirestore,
  ) { }
// Register a new user
async register(name: string, email: string, password: string, role: string) {
  try {
    const res = await this.afAuth.createUserWithEmailAndPassword(email, password);

    // Enregistrer l'utilisateur dans Firestore
    await this.firestore.collection('users').doc(res.user?.uid).set({
      uid: res.user?.uid,
      email: email,
      name: name,
      role: role,
    });

    return res;
  } catch (error) {
    console.error('Error during registration:', error);
    throw error;
  }
}
async loginUser(email : string,password:string){
  return await this.ngFireAuth.signInWithEmailAndPassword(email,password)
}
async resetPassword(email:string){
 return await this.ngFireAuth.sendPasswordResetEmail(email)
}
async signOut(){
  return await this.ngFireAuth.signOut()
}

// get all users
 // Get all users
 getAllUsers(): Observable<any[]> {
  return this.firestore.collection('users').valueChanges();
}


}

