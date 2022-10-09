import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageTitleGameComponent } from './page-title-game.component';

describe('PageTitleGameComponent', () => {
  let component: PageTitleGameComponent;
  let fixture: ComponentFixture<PageTitleGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageTitleGameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageTitleGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
