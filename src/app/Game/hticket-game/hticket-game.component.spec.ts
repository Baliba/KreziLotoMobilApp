import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HTicketGameComponent } from './hticket-game.component';

describe('HTicketGameComponent', () => {
  let component: HTicketGameComponent;
  let fixture: ComponentFixture<HTicketGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HTicketGameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HTicketGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
