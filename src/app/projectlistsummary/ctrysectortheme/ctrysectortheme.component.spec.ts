import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CtrysectorthemeComponent } from './ctrysectortheme.component';

describe('CtrysectorthemeComponent', () => {
  let component: CtrysectorthemeComponent;
  let fixture: ComponentFixture<CtrysectorthemeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CtrysectorthemeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CtrysectorthemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
