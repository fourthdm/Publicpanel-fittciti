import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IsopureComponent } from './isopure.component';

describe('IsopureComponent', () => {
  let component: IsopureComponent;
  let fixture: ComponentFixture<IsopureComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IsopureComponent]
    });
    fixture = TestBed.createComponent(IsopureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
