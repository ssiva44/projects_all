import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LendingIndicatorsComponent } from './lending-indicators.component';

describe('LendingIndicatorsComponent', () => {
  let component: LendingIndicatorsComponent;
  let fixture: ComponentFixture<LendingIndicatorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LendingIndicatorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LendingIndicatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
