import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../service/auth/authentication.service'; // Import du AuthService
import { Router } from '@angular/router';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})

  export class SignUpPage implements OnInit {
    signUp = {
      name: '',
      email: '',
      password: '',
      role: ''
    };
  
    type: boolean = true; // Variable pour afficher/masquer le mot de passe
  
    constructor(private authService: AuthenticationService, private router: Router) {}
  
    ngOnInit() {}
  
    // Méthode pour gérer l'enregistrement d'un utilisateur
    register() {
      const { name, email, password, role } = this.signUp;
      
      // Vérifier que tous les champs sont remplis
      if (name && email && password && role) {
        // Appel au service d'enregistrement
        this.authService.register(name, email, password, role)
          .then(() => {
            console.log('Enregistrement réussi');
            this.router.navigate(['/login']); // Redirection vers la page d'accueil après succès
          })
          .catch(err => {
            console.log('Erreur lors de l\'enregistrement:', err);
          });
      } else {
        console.log('Veuillez remplir tous les champs'); // Message d'erreur si un champ est manquant
      }
    }
  
    // Méthode pour afficher/masquer le mot de passe
    changeType() {
      this.type = !this.type;
    }
  }
  