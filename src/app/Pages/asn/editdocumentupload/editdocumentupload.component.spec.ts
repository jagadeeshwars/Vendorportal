import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditdocumentuploadComponent } from './editdocumentupload.component';

describe('EditdocumentuploadComponent', () => {
  let component: EditdocumentuploadComponent;
  let fixture: ComponentFixture<EditdocumentuploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditdocumentuploadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditdocumentuploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
