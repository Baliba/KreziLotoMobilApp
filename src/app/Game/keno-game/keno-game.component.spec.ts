import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KenoGameComponent } from './keno-game.component';

describe('KenoGameComponent', () => {
  let component: KenoGameComponent;
  let fixture: ComponentFixture<KenoGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KenoGameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KenoGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
