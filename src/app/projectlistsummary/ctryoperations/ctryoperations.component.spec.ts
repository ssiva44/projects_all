import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CtryoperationsComponent } from './ctryoperations.component';

describe('CtryoperationsComponent', () => {
  let component: CtryoperationsComponent;
  let fixture: ComponentFixture<CtryoperationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CtryoperationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CtryoperationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
