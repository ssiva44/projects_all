import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Projects.DateComponent } from './projects.date.component';

describe('Projects.DateComponent', () => {
  let component: Projects.DateComponent;
  let fixture: ComponentFixture<Projects.DateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Projects.DateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Projects.DateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
