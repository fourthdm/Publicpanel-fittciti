import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DymatizeComponent } from './dymatize.component';

describe('DymatizeComponent', () => {
  let component: DymatizeComponent;
  let fixture: ComponentFixture<DymatizeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DymatizeComponent]
    });
    fixture = TestBed.createComponent(DymatizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
