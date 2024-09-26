import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactTypeAddComponent } from './contact-type-add.component';

describe('ContactTypeAddComponent', () => {
  let component: ContactTypeAddComponent;
  let fixture: ComponentFixture<ContactTypeAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactTypeAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactTypeAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
