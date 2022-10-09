import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KreziMilyonComponent } from './krezi-milyon.component';

describe('KreziMilyonComponent', () => {
  let component: KreziMilyonComponent;
  let fixture: ComponentFixture<KreziMilyonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KreziMilyonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KreziMilyonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
