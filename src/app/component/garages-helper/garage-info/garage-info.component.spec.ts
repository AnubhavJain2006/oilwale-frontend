import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GarageInfoComponent } from './garage-info.component';

describe('GarageInfoComponent', () => {
  let component: GarageInfoComponent;
  let fixture: ComponentFixture<GarageInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GarageInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GarageInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
