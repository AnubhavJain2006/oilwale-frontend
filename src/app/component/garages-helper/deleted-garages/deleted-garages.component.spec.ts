import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletedGaragesComponent } from './deleted-garages.component';

describe('DeletedGaragesComponent', () => {
  let component: DeletedGaragesComponent;
  let fixture: ComponentFixture<DeletedGaragesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletedGaragesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletedGaragesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
