import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsTicketGameComponent } from './details-ticket-game.component';

describe('DetailsTicketGameComponent', () => {
  let component: DetailsTicketGameComponent;
  let fixture: ComponentFixture<DetailsTicketGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsTicketGameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsTicketGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
