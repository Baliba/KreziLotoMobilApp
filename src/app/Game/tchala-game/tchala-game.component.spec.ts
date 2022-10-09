import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TchalaGameComponent } from './tchala-game.component';

describe('TchalaGameComponent', () => {
  let component: TchalaGameComponent;
  let fixture: ComponentFixture<TchalaGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TchalaGameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TchalaGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
