import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HDepoGameComponent } from './hdepo-game.component';

describe('HDepoGameComponent', () => {
  let component: HDepoGameComponent;
  let fixture: ComponentFixture<HDepoGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HDepoGameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HDepoGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
