import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CPassGameComponent } from './c-pass-game.component';

describe('CPassGameComponent', () => {
  let component: CPassGameComponent;
  let fixture: ComponentFixture<CPassGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CPassGameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CPassGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
