import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Projects.MobilefacetsComponent } from './projects.mobilefacets.component';

describe('Projects.MobilefacetsComponent', () => {
  let component: Projects.MobilefacetsComponent;
  let fixture: ComponentFixture<Projects.MobilefacetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Projects.MobilefacetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Projects.MobilefacetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
