import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChefInfoPage } from './chef-info.page';

describe('ChefInfoPage', () => {
  let component: ChefInfoPage;
  let fixture: ComponentFixture<ChefInfoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ChefInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
