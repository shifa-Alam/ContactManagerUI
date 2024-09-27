import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactTypeComboComponent } from './contact-type-combo.component';

describe('ContactTypeComboComponent', () => {
  let component: ContactTypeComboComponent;
  let fixture: ComponentFixture<ContactTypeComboComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactTypeComboComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactTypeComboComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
