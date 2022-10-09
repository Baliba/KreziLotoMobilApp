import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketMakerComponent } from './ticket-maker.component';

describe('TicketMakerComponent', () => {
  let component: TicketMakerComponent;
  let fixture: ComponentFixture<TicketMakerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketMakerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketMakerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
