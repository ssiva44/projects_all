import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbstractDetailsComponent } from './abstract-details.component';

describe('AbstractDetailsComponent', () => {
  let component: AbstractDetailsComponent;
  let fixture: ComponentFixture<AbstractDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbstractDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbstractDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
