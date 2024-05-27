import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MuscletechComponent } from './muscletech.component';

describe('MuscletechComponent', () => {
  let component: MuscletechComponent;
  let fixture: ComponentFixture<MuscletechComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MuscletechComponent]
    });
    fixture = TestBed.createComponent(MuscletechComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
