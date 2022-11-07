import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntegerModalComponent } from './integer-modal.component';

describe('IntegerModalComponent', () => {
  let component: IntegerModalComponent;
  let fixture: ComponentFixture<IntegerModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ IntegerModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IntegerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
