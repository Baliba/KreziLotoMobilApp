import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilGameComponent } from './profil-game.component';

describe('ProfilGameComponent', () => {
  let component: ProfilGameComponent;
  let fixture: ComponentFixture<ProfilGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilGameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
