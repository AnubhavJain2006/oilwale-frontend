import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllSchemesComponent } from './all-schemes.component';

describe('AllSchemesComponent', () => {
  let component: AllSchemesComponent;
  let fixture: ComponentFixture<AllSchemesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllSchemesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllSchemesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
