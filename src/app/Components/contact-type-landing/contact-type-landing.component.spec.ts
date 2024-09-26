import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactTypeLandingComponent } from './contact-type-landing.component';

describe('ContactTypeLandingComponent', () => {
  let component: ContactTypeLandingComponent;
  let fixture: ComponentFixture<ContactTypeLandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactTypeLandingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactTypeLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
