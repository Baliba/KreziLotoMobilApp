import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterMenuGameComponent } from './footer-menu-game.component';

describe('FooterMenuGameComponent', () => {
  let component: FooterMenuGameComponent;
  let fixture: ComponentFixture<FooterMenuGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FooterMenuGameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterMenuGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
