import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertGameComponent } from './alert-game.component';

describe('AlertGameComponent', () => {
  let component: AlertGameComponent;
  let fixture: ComponentFixture<AlertGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlertGameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
