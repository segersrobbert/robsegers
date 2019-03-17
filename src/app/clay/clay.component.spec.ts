import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClayComponent } from './clay.component';

describe('ClayComponent', () => {
  let component: ClayComponent;
  let fixture: ComponentFixture<ClayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
