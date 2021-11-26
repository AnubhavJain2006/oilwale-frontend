import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveGaragesComponent } from './active-garages.component';

describe('ActiveGaragesComponent', () => {
  let component: ActiveGaragesComponent;
  let fixture: ComponentFixture<ActiveGaragesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActiveGaragesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveGaragesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
