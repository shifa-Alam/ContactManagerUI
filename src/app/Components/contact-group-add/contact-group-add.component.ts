import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ContactGroup } from '../../Models/contactGroup';
import { ContactGroupService } from '../../Services/contact-group.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarService } from '../../Services/snackbar.service';

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
    private snackbarService: SnackbarService,
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

    this.dialogRef.updateSize('50%')
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
   
    this.contactGroup.name = this.contactGroupForm.value.name as string;
    if (this.contactGroup.id) {
      this.service.updateContactGroup(this.contactGroup).subscribe({
        next: (res: any) => {
          this.dialogRef.close();
          this.snackbarService.openSuccess("Updated Successfully");
        },
        error: (error: any) => {
          this.snackbarService.openError(error.error);
        }
      });

    } else {
      this.service.saveContactGroup(this.contactGroup).subscribe({
        next: (res: any) => {
          this.dialogRef.close();
          this.snackbarService.openSuccess(' Save Sucessfully');
        },
        error: (error: any) => {
          this.snackbarService.openError(error.error);
        }
      });


    }
  }

}


