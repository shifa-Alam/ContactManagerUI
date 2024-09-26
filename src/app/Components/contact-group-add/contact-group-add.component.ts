import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Contact } from '../../Models/contact';
import { ContactGroup } from '../../Models/contactGroup';
import { ContactType } from '../../Models/contactType';
import { ContactGroupService } from '../../Services/contact-group.service';
import { ContactTypeService } from '../../Services/contact-type.service';
import { ContactService } from '../../Services/contact.service';

export interface contactGroupForm {
  name: FormControl<string>;
}

@Component({
  selector: 'app-contact-group-add',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './contact-group-add.component.html',
  styleUrl: './contact-group-add.component.css'
})
export class ContactGroupAddComponent implements OnInit {

  contactGroup: ContactGroup = new ContactGroup();
  contactGroupForm!: FormGroup<contactGroupForm>;


  constructor(
    public service: ContactGroupService,
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<contactGroupForm>,
    @Inject(MAT_DIALOG_DATA) public data: {
      contactGroup: ContactGroup
    }
  ) {
    Object.assign(this.contactGroup, data.contactGroup);
  }
  ngOnInit(): void {
   
    this.dialogRef.updateSize('75%')
    this.createContactGroupForm();
    this.setValue();
   
  }
  createContactGroupForm() {
    this.contactGroupForm = new FormGroup<contactGroupForm>({
      name: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    });
  }
  setValue() {
    if (this.contactGroup) {
      this.contactGroupForm.patchValue({
        name: this.contactGroup.name,
       
      })
    }
  }

  cancel() {
    this.dialogRef.close();
  }
  submit() {
    console.log(this.contactGroupForm);
    this.contactGroup.name = this.contactGroupForm.value.name as string;
    

    if (this.contactGroup.id) {
      this.service.updateContactGroup(this.contactGroup).subscribe(result => {
        this.dialogRef.close();
      },
        error => console.error(error));

    } else {

      this.service.saveContactGroup(this.contactGroup).subscribe(result => {
        this.dialogRef.close();
      },
        error => console.error(error));


    }
  }

}


