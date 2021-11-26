import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PastSchemesComponent } from './past-schemes.component';

describe('PastSchemesComponent', () => {
  let component: PastSchemesComponent;
  let fixture: ComponentFixture<PastSchemesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PastSchemesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PastSchemesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
