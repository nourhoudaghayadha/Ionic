import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RepasService } from '../../service/chef/repas/repas.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';

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

  constructor(private repasService: RepasService, private storage: AngularFireStorage) {}

  ngOnInit() {}

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
        resolve(''); // Pas d'image à uploader
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
  
        this.repasService.addRepas(chefData).subscribe(
          () => {
            console.log('Repas ajouté avec succès');
            form.resetForm();
            this.selectedSkills = [];
            this.otherSkill = '';
            this.showOtherInput = false;
            this.selectedImage = null;
          },
          error => console.error('Erreur lors de l\'ajout du repas :', error)
        );
      }).catch(error => console.error('Erreur lors du téléchargement de l\'image :', error));
    } else {
      console.log('Formulaire invalide', form);
    }
  }
  
}
