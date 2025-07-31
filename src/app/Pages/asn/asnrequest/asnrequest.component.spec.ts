import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsnrequestComponent } from './asnrequest.component';

describe('AsnrequestComponent', () => {
  let component: AsnrequestComponent;
  let fixture: ComponentFixture<AsnrequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsnrequestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsnrequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
