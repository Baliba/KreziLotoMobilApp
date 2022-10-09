import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayBorComponent } from './play-bor.component';

describe('PlayBorComponent', () => {
  let component: PlayBorComponent;
  let fixture: ComponentFixture<PlayBorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayBorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayBorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
