import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactGroupAddComponent } from './contact-group-add.component';

describe('ContactGroupAddComponent', () => {
  let component: ContactGroupAddComponent;
  let fixture: ComponentFixture<ContactGroupAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactGroupAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactGroupAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
