import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleActivitiesComponent } from './vehicle-activities.component';

describe('VehicleActivitiesComponent', () => {
  let component: VehicleActivitiesComponent;
  let fixture: ComponentFixture<VehicleActivitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicleActivitiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleActivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
