import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoCreditComponent } from './no-credit.component';

describe('NoCreditComponent', () => {
  let component: NoCreditComponent;
  let fixture: ComponentFixture<NoCreditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoCreditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoCreditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
