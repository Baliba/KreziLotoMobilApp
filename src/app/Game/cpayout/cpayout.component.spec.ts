import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CPayoutComponent } from './cpayout.component';

describe('CPayoutComponent', () => {
  let component: CPayoutComponent;
  let fixture: ComponentFixture<CPayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CPayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CPayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
