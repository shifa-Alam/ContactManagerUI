import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ContactType } from '../../Models/contactType';
import { ContactTypeService } from '../../Services/contact-type.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { SnackbarService } from '../../Services/snackbar.service';



export interface contactTypeForm {
  name: FormControl<string>;
}

@Component({
  selector: 'app-contact-type-add',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './contact-type-add.component.html',
  styleUrl: './contact-type-add.component.css'
})
export class ContactTypeAddComponent implements OnInit {

  contactType: ContactType = new ContactType();
  contactTypeForm!: FormGroup<contactTypeForm>;


  constructor(
    private snackbarService: SnackbarService,
    public service: ContactTypeService,
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<contactTypeForm>,
    @Inject(MAT_DIALOG_DATA) public data: {
      contactType: ContactType
    }
  ) {
    Object.assign(this.contactType, data.contactType);
  }
  ngOnInit(): void {

    this.dialogRef.updateSize('50%')
    this.createContactTypeForm();
    this.setValue();

  }
  createContactTypeForm() {
    this.contactTypeForm = new FormGroup<contactTypeForm>({
      name: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    });
  }
  setValue() {
    if (this.contactType) {
      this.contactTypeForm.patchValue({
        name: this.contactType.name,

      })
    }
  }

  cancel() {
    this.dialogRef.close();
  }
  submit() {
    console.log(this.contactTypeForm);
    this.contactType.name = this.contactTypeForm.value.name as string;


    if (this.contactType.id) {
      this.service.updateContactType(this.contactType).subscribe({
        next: (res: any) => {
          this.dialogRef.close();
          this.snackbarService.openSuccess("Update Successfully");
        },
        error: (error: any) => {
          this.snackbarService.openError(error.error);
        }
      });
    } else {

      this.service.saveContactType(this.contactType).subscribe({
        next: (res: any) => {
          this.dialogRef.close();
          this.snackbarService.openSuccess('Sucessfully Added');
        },
        error: (error: any) => {
          this.snackbarService.openError(error.error);
        }
      });
    }
  }

}


