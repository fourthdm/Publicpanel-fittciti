import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SanComponent } from './san.component';

describe('SanComponent', () => {
  let component: SanComponent;
  let fixture: ComponentFixture<SanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SanComponent]
    });
    fixture = TestBed.createComponent(SanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
