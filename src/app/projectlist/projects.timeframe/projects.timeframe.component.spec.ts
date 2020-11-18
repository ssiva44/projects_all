import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Projects.TimeframeComponent } from './projects.timeframe.component';

describe('Projects.TimeframeComponent', () => {
  let component: Projects.TimeframeComponent;
  let fixture: ComponentFixture<Projects.TimeframeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Projects.TimeframeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Projects.TimeframeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
