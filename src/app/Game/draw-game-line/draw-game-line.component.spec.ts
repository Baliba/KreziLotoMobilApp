import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawGameLineComponent } from './draw-game-line.component';

describe('DrawGameLineComponent', () => {
  let component: DrawGameLineComponent;
  let fixture: ComponentFixture<DrawGameLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrawGameLineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DrawGameLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
