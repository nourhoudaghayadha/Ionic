import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrderMenuPage } from './order-menu.page';

describe('OrderMenuPage', () => {
  let component: OrderMenuPage;
  let fixture: ComponentFixture<OrderMenuPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderMenuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
