import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsnreportComponent } from './asnreport.component';

describe('AsnreportComponent', () => {
  let component: AsnreportComponent;
  let fixture: ComponentFixture<AsnreportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsnreportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsnreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
