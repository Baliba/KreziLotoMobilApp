import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayBJComponent } from './play-bj.component';

describe('PlayBJComponent', () => {
  let component: PlayBJComponent;
  let fixture: ComponentFixture<PlayBJComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayBJComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayBJComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
