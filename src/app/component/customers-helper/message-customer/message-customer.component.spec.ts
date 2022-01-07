import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageCustomerComponent } from './message-customer.component';

describe('MessageCustomerComponent', () => {
  let component: MessageCustomerComponent;
  let fixture: ComponentFixture<MessageCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessageCustomerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
