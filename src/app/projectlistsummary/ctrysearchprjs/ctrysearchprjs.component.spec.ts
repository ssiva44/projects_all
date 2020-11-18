import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CtrysearchprjsComponent } from './ctrysearchprjs.component';

describe('CtrysearchprjsComponent', () => {
  let component: CtrysearchprjsComponent;
  let fixture: ComponentFixture<CtrysearchprjsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CtrysearchprjsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CtrysearchprjsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
