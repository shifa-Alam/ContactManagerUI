import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Contact } from '../../Models/contact';
import { ContactService } from '../../Services/contact.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ContactTypeService } from '../../Services/contact-type.service';
import { ContactGroupService } from '../../Services/contact-group.service';
import { ContactType } from '../../Models/contactType';
import { ContactGroup } from '../../Models/contactGroup';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { SnackbarService } from '../../Services/snackbar.service';
import { HttpErrorResponse } from '@angular/common/http';




export interface contactFormGroup {
  name: FormControl<string>;
  phoneNumber?: FormControl<string>;
  contactTypeId: FormControl<number>;
  contactGroupId?: FormControl<number>;
}
@Component({
  selector: 'app-contact-add',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule


  ],
  templateUrl: './contact-add.component.html',
  styleUrl: './contact-add.component.css'
})
export class ContactAddComponent implements OnInit {

  contact: Contact = new Contact();
  contactForm!: FormGroup<contactFormGroup>;
  contactTypes: ContactType[] = [];
  contactGroups: ContactGroup[] = [];

  constructor(
    private snackbarService: SnackbarService,
    public service: ContactService,
    public typeService: ContactTypeService,
    public groupService: ContactGroupService,
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<ContactAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      contact: Contact
    }
  ) {
    Object.assign(this.contact, data.contact);
  }
  ngOnInit(): void {
    this.loadTypes();
    this.loadGroups();
    this.dialogRef.updateSize('75%')
    this.createContactForm();
    this.setValue();

  }
  createContactForm() {
    this.contactForm = new FormGroup<contactFormGroup>({
      name: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
      phoneNumber: new FormControl<string>('', { nonNullable: true }),
      contactTypeId: new FormControl<number>(0, { nonNullable: true, validators: [Validators.required] }),
      contactGroupId: new FormControl<number>(0, { nonNullable: true, validators: [Validators.required] }),
    });
  }
  setValue() {
    if (this.contact) {
      this.contactForm.patchValue({
        name: this.contact.name,
        phoneNumber: this.contact.phoneNumber,
        contactTypeId: this.contact.contactTypeId,
        contactGroupId: this.contact.contactGroupId
      })
    }
  }

  cancel() {
    this.dialogRef.close();
  }
  submit() {

    this.contact.name = this.contactForm.value.name as string;
    this.contact.phoneNumber = this.contactForm.value.phoneNumber as string;
    this.contact.contactTypeId = this.contactForm.value.contactTypeId as number;
    this.contact.contactGroupId = this.contactForm.value.contactGroupId as number;

    if (this.contact.id) {
      this.service.updateContact(this.contact).subscribe({
        next: (res: any) => {
          this.dialogRef.close();
          this.snackbarService.openSuccess("Update Successfully");
        },
        error: (error: any) => {
          this.snackbarService.openError(error.message);
        }
      });

    } else {

      this.service.saveContact(this.contact).subscribe({
        next: (res: any) => {
          this.dialogRef.close();
          this.snackbarService.openSuccess('Sucessfully Added');
        },
        error: (error: any) => {
          this.snackbarService.openError(error.message);
        }
      });


    }
  }
  loadTypes() {
    this.typeService.getAll().subscribe({
      next: (res: any) => {
        this.contactTypes = res;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.error);
      }
    });
  }

  loadGroups() {
    this.groupService.getAll().subscribe({
      next: (res: any) => {
        this.contactGroups = res;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.error);
      }
    });
  }
}


