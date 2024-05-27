import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Healthinnvo8Component } from './healthinnvo8.component';

describe('Healthinnvo8Component', () => {
  let component: Healthinnvo8Component;
  let fixture: ComponentFixture<Healthinnvo8Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Healthinnvo8Component]
    });
    fixture = TestBed.createComponent(Healthinnvo8Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
