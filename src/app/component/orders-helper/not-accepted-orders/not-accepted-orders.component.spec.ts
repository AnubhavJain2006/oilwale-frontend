import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotAcceptedOrdersComponent } from './not-accepted-orders.component';

describe('NotAcceptedOrdersComponent', () => {
  let component: NotAcceptedOrdersComponent;
  let fixture: ComponentFixture<NotAcceptedOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotAcceptedOrdersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotAcceptedOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
