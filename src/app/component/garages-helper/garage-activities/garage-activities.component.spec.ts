import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GarageActivitiesComponent } from './garage-activities.component';

describe('GarageActivitiesComponent', () => {
  let component: GarageActivitiesComponent;
  let fixture: ComponentFixture<GarageActivitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GarageActivitiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GarageActivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
