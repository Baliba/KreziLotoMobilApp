import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoldShowerGameComponent } from './sold-shower-game.component';

describe('SoldShowerGameComponent', () => {
  let component: SoldShowerGameComponent;
  let fixture: ComponentFixture<SoldShowerGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SoldShowerGameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SoldShowerGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
