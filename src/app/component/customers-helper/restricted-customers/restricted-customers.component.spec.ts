import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestrictedCustomersComponent } from './restricted-customers.component';

describe('RestrictedCustomersComponent', () => {
  let component: RestrictedCustomersComponent;
  let fixture: ComponentFixture<RestrictedCustomersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestrictedCustomersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestrictedCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
