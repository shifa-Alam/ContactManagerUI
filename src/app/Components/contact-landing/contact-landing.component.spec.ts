import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactLandingComponent } from './contact-landing.component';

describe('ContactLandingComponent', () => {
  let component: ContactLandingComponent;
  let fixture: ComponentFixture<ContactLandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactLandingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
