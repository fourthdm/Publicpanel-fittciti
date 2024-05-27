import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewcartComponent } from './newcart.component';

describe('NewcartComponent', () => {
  let component: NewcartComponent;
  let fixture: ComponentFixture<NewcartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewcartComponent]
    });
    fixture = TestBed.createComponent(NewcartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
