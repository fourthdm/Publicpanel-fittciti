import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BsnComponent } from './bsn.component';

describe('BsnComponent', () => {
  let component: BsnComponent;
  let fixture: ComponentFixture<BsnComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BsnComponent]
    });
    fixture = TestBed.createComponent(BsnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
