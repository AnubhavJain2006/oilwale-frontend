import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderActivitiesComponent } from './order-activities.component';

describe('OrderActivitiesComponent', () => {
  let component: OrderActivitiesComponent;
  let fixture: ComponentFixture<OrderActivitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderActivitiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderActivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
