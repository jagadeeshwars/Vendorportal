import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PoScheduleDateComponent } from './po-schedule-date.component';

describe('PoScheduleDateComponent', () => {
  let component: PoScheduleDateComponent;
  let fixture: ComponentFixture<PoScheduleDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PoScheduleDateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PoScheduleDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
