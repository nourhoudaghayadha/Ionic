import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RepasService } from '../../service/chef/repas/repas.service';
import { AngularFireStorage } from '@angular/fire/compat/storage'; // Importez AngularFireStorage
import { finalize } from 'rxjs/operators'; // Pour finaliser le téléchargement

@Component({
  selector: 'app-chef-info',
  templateUrl: './chef-info.page.html',
  styleUrls: ['./chef-info.page.scss'],
})
export class ChefInfoPage implements OnInit {
  
  selectedSkills: string[] = [];
  showOtherInput: boolean = false;
  otherSkill: string = '';
  prix: { lower: number; upper: number } = { lower: 5, upper: 100 };
  
  selectedImage: File | null = null; // Pour stocker l'image sélectionnée
  imageUrl: string = ''; // Pour stocker l'URL de l'image téléchargée

  constructor(private RepasService: RepasService, private storage: AngularFireStorage) {}

  ngOnInit() {}

  onSkillChange() {
    this.showOtherInput = this.selectedSkills.includes('autre');
  }

  // Méthode pour gérer la sélection d'image
  onFileSelected(event: any) {
    this.selectedImage = event.target.files[0]; // Récupérer le fichier sélectionné
  }

  // Méthode pour uploader l'image
  uploadImage(): Promise<string> {
    return new Promise((resolve, reject) => {
      if (this.selectedImage) {
        const filePath = `images/${this.selectedImage.name}`;
        const fileRef = this.storage.ref(filePath);
        const task = this.storage.upload(filePath, this.selectedImage);

        // Finaliser le téléchargement et obtenir l'URL
        task.snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe(url => {
              this.imageUrl = url; // Stockez l'URL de l'image
              resolve(this.imageUrl);
            }, error => reject(error));
          })
        ).subscribe();
      } else {
        resolve(''); // Pas d'image à uploader
      }
    });
  }

  // Méthode de soumission du formulaire
  onSubmit(form: NgForm) {
    if (form.valid) {
      this.uploadImage().then(url => {
        console.log('Image uploadée avec succès, URL:', url); // Ajoutez cette ligne
        const chefData = {
          nom: form.value.nom,
          prenom: form.value.prenom,
          skills: this.selectedSkills.includes('autre')
            ? [...this.selectedSkills.filter(skill => skill !== 'autre'), this.otherSkill]
            : this.selectedSkills,
          typesFood: form.value.typesFood,
          localisation: form.value.localisation,
          prix: this.prix,
          photoUrl: url 
        };
  
        console.log('Données du chef à envoyer:', chefData); // Ajoutez cette ligne
  
        this.RepasService.addRepas(chefData)
          .then(() => {
            console.log('Chef ajouté avec succès');
            form.resetForm(); 
            this.selectedSkills = [];
            this.otherSkill = '';
            this.showOtherInput = false;
            this.selectedImage = null; 
          })
          .catch(error => console.error('Erreur lors de l\'ajout du chef :', error));
      }).catch(error => console.error('Erreur lors du téléchargement de l\'image :', error));
    } else {
      console.log('Formulaire invalide', form); // Ajoutez cette ligne
    }
  }
  
}
