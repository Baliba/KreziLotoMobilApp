import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotGameComponent } from './not-game.component';

describe('NotGameComponent', () => {
  let component: NotGameComponent;
  let fixture: ComponentFixture<NotGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotGameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
