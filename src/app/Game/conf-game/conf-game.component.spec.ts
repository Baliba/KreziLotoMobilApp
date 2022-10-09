import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfGameComponent } from './conf-game.component';

describe('ConfGameComponent', () => {
  let component: ConfGameComponent;
  let fixture: ComponentFixture<ConfGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfGameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
