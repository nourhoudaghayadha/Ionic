import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdateFoodPage } from './update-food.page';

describe('UpdateFoodPage', () => {
  let component: UpdateFoodPage;
  let fixture: ComponentFixture<UpdateFoodPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateFoodPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
