import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegGameComponent } from './reg-game.component';

describe('RegGameComponent', () => {
  let component: RegGameComponent;
  let fixture: ComponentFixture<RegGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegGameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
