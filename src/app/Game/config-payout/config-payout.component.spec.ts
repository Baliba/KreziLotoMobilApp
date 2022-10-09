import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigPayoutComponent } from './config-payout.component';

describe('ConfigPayoutComponent', () => {
  let component: ConfigPayoutComponent;
  let fixture: ComponentFixture<ConfigPayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigPayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigPayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
