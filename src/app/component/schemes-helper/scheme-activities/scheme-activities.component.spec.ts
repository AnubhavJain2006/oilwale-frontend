import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchemeActivitiesComponent } from './scheme-activities.component';

describe('SchemeActivitiesComponent', () => {
  let component: SchemeActivitiesComponent;
  let fixture: ComponentFixture<SchemeActivitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchemeActivitiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SchemeActivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
