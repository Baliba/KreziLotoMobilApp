import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolsGameComponent } from './tools-game.component';

describe('ToolsGameComponent', () => {
  let component: ToolsGameComponent;
  let fixture: ComponentFixture<ToolsGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToolsGameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolsGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
