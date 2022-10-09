import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketGameComponent } from './ticket-game.component';

describe('TicketGameComponent', () => {
  let component: TicketGameComponent;
  let fixture: ComponentFixture<TicketGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketGameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
