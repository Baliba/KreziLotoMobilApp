import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HTirajGameComponent } from './htiraj-game.component';

describe('HTirajGameComponent', () => {
  let component: HTirajGameComponent;
  let fixture: ComponentFixture<HTirajGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HTirajGameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HTirajGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
