import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChefdetailsPage } from './chefdetails.page';

describe('ChefdetailsPage', () => {
  let component: ChefdetailsPage;
  let fixture: ComponentFixture<ChefdetailsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ChefdetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
