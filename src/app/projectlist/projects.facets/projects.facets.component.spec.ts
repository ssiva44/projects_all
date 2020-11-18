import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Projects.FacetsComponent } from './projects.facets.component';

describe('Projects.FacetsComponent', () => {
  let component: Projects.FacetsComponent;
  let fixture: ComponentFixture<Projects.FacetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Projects.FacetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Projects.FacetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
