import { Component,OnInit } from '@angular/core';
import { MealService } from '../service/meal/meal.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  filters={
    "meal_type" : "lunch",
    "cuisine" : "indian",
    "distance" : 5,
    "popular" : true,
    "priceByOrder" : 'highToLow',
    "price": {
      "lowerPrice" : "5",
      "higherPrice": "10",
    }
  }

  constructor(private mealService: MealService) {}
  ngOnInit(){

  }
  mealTypeChange(ev: { detail: { value: any; }; }){
    console.log(ev.detail.value);
    const type = ev.detail.value;
    this.filters.meal_type = type;


    
  }
  cuisineTypeChange(ev: { detail: { value: any; }; }){
    console.log(ev.detail.value);
    const type = ev.detail.value;
    this.filters.cuisine = type;
  }


  distanceTypeChange(ev: { detail: { value: any; }; }){
    console.log(ev.detail.value);
    const type = ev.detail.value;
    this.filters.distance = type;
  }


  
  popularTypeChange(ev: { detail: { value: any; }; }){
    console.log(ev.detail.value);
    const type = ev.detail.value;
    this.filters.popular = type;
  }
    
  highLowChange(ev: { detail: { value: any; }; }){
    console.log(ev.detail.value);
    const type = ev.detail.value;
    this.filters.priceByOrder = type;
  }



  priceChange(ev: { detail: { value: any; }; }){
    console.log(ev.detail.value);
    const type = ev.detail.value;
    this.filters.price.lowerPrice = type.lower;
    this.filters.price.higherPrice = type.upper;
    console.log(this.filters.price)

  }
  
  reset(){
  
    }


    applyFilters() {
      this.mealService.saveFilters(this.filters).subscribe({
        next: (response: any) => console.log('Filtres enregistrés avec succès dans Firebase !', response),
        error: (error: any) => console.error('Erreur lors de l\'enregistrement des filtres :', error)
      });
    }
    
  }
 

