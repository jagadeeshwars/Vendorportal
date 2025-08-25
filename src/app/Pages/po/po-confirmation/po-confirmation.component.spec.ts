import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PoConfirmationComponent } from './po-confirmation.component';

describe('PoComponent', () => {
  let component: PoConfirmationComponent;
  let fixture: ComponentFixture<PoConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PoConfirmationComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PoConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
