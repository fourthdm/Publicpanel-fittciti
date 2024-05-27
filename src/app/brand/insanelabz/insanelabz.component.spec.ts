import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsanelabzComponent } from './insanelabz.component';

describe('InsanelabzComponent', () => {
  let component: InsanelabzComponent;
  let fixture: ComponentFixture<InsanelabzComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InsanelabzComponent]
    });
    fixture = TestBed.createComponent(InsanelabzComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
