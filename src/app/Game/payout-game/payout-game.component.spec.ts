import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayoutGameComponent } from './payout-game.component';

describe('PayoutGameComponent', () => {
  let component: PayoutGameComponent;
  let fixture: ComponentFixture<PayoutGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayoutGameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PayoutGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
