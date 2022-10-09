import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrensipGameComponent } from './prensip-game.component';

describe('PrensipGameComponent', () => {
  let component: PrensipGameComponent;
  let fixture: ComponentFixture<PrensipGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrensipGameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrensipGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
