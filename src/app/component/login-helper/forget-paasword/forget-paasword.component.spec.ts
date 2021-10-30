import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgetPaaswordComponent } from './forget-paasword.component';

describe('ForgetPaaswordComponent', () => {
  let component: ForgetPaaswordComponent;
  let fixture: ComponentFixture<ForgetPaaswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForgetPaaswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgetPaaswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
