import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PastPayoutComponent } from './past-payout.component';

describe('PastPayoutComponent', () => {
  let component: PastPayoutComponent;
  let fixture: ComponentFixture<PastPayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PastPayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PastPayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
