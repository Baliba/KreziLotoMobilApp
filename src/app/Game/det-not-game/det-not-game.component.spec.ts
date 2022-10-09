import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetNotGameComponent } from './det-not-game.component';

describe('DetNotGameComponent', () => {
  let component: DetNotGameComponent;
  let fixture: ComponentFixture<DetNotGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetNotGameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetNotGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
