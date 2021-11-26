import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountActivitiesComponent } from './account-activities.component';

describe('AccountActivitiesComponent', () => {
  let component: AccountActivitiesComponent;
  let fixture: ComponentFixture<AccountActivitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountActivitiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountActivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
