import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductActivitiesComponent } from './product-activities.component';

describe('ProductActivitiesComponent', () => {
  let component: ProductActivitiesComponent;
  let fixture: ComponentFixture<ProductActivitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductActivitiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductActivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
