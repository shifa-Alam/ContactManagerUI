import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactGroupLandingComponent } from './contact-group-landing.component';

describe('ContactGroupLandingComponent', () => {
  let component: ContactGroupLandingComponent;
  let fixture: ComponentFixture<ContactGroupLandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactGroupLandingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactGroupLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
