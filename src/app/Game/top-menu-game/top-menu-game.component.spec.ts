import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopMenuGameComponent } from './top-menu-game.component';

describe('TopMenuGameComponent', () => {
  let component: TopMenuGameComponent;
  let fixture: ComponentFixture<TopMenuGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopMenuGameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopMenuGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
