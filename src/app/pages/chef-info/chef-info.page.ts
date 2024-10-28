import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RepasService } from '../../service/chef/repas/repas.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

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
  
  selectedImage: File | null = null;
  imageUrl: string = '';

  // Propriétés pour la mise à jour
  repasId: string | null = null; // ID du repas à mettre à jour
  currentRepas: { nom: string; skills: string[]; typesFood: string[]; localisation: string; prix: any; photoUrl: string } = {
    nom: '',
    skills: [],
    typesFood: [],
    localisation: '',
    prix: { lower: 5, upper: 100 },
    photoUrl: ''
  };

  constructor(
    private repasService: RepasService,
    private storage: AngularFireStorage,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // Récupérer l'ID du repas depuis les paramètres de la route
    this.route.paramMap.subscribe(params => {
      this.repasId = params.get('id');
      if (this.repasId) {
        this.loadRepas(this.repasId);
      }
    });
  }

  // Charger les données du repas
  loadRepas(id: string) {
    this.repasService.getRepasById(id).subscribe(repas => {
      this.currentRepas = repas;
      this.selectedSkills = repas.skills;
      this.otherSkill = repas.skills.includes('autre') ? repas.skills.find((skill: string) => skill === 'autre') : '';
      this.prix = repas.prix;
      this.imageUrl = repas.photoUrl;
      // Pré-remplir le formulaire avec les données du repas
    });
  }

  onSkillChange() {
    this.showOtherInput = this.selectedSkills.includes('autre');
  }

  onFileSelected(event: any) {
    this.selectedImage = event.target.files[0];
  }

  uploadImage(): Promise<string> {
    return new Promise((resolve, reject) => {
      if (this.selectedImage) {
        const filePath = `images/${this.selectedImage.name}`;
        const fileRef = this.storage.ref(filePath);
        const task = this.storage.upload(filePath, this.selectedImage);

        task.snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe(url => {
              this.imageUrl = url;
              resolve(this.imageUrl);
            }, error => reject(error));
          })
        ).subscribe();
      } else {
        resolve(this.imageUrl); // Utiliser l'URL de l'image existante si aucune nouvelle image n'est sélectionnée
      }
    });
  }

  // Méthode de soumission du formulaire
  onSubmit(form: NgForm) {
    if (form.valid) {
      this.uploadImage().then(url => {
        const chefData = {
          nom: form.value.nom,
          skills: this.selectedSkills.includes('autre')
            ? [...this.selectedSkills.filter(skill => skill !== 'autre'), this.otherSkill]
            : this.selectedSkills,
          typesFood: form.value.typesFood,
          localisation: form.value.localisation,
          prix: this.prix,
          photoUrl: url
        };

        if (this.repasId) {
          // Mise à jour du repas existant
          this.repasService.updateRepas(this.repasId, chefData).subscribe(
            () => {
              console.log(`Repas mis à jour avec succès, ID: ${this.repasId}`);
              form.resetForm();
              this.selectedSkills = [];
              this.otherSkill = '';
              this.showOtherInput = false;
              this.selectedImage = null;
              this.router.navigate(['/chefdetails']);
            },
            error => console.error('Erreur lors de la mise à jour du repas :', error)
          );
        } else {
          // Ajout d'un nouveau repas
          this.repasService.addRepas(chefData).subscribe(
            (id) => {
              console.log(`Repas ajouté avec succès, ID: ${id}`);
              form.resetForm();
              this.selectedSkills = [];
              this.otherSkill = '';
              this.showOtherInput = false;
              this.selectedImage = null;
              this.router.navigate(['/chefdetails']);
            },
            error => console.error('Erreur lors de l\'ajout du repas :', error)
          );
        }
      }).catch(error => console.error('Erreur lors du téléchargement de l\'image :', error));
    } else {
      console.log('Formulaire invalide', form);
    }
  }
  
  goToAddPage() {
    this.router.navigate(['/chefdetails']); // Redirige vers la page d'ajout de repas
  }
}
