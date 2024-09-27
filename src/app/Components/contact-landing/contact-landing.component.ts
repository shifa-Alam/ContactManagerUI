import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { ContactService } from '../../Services/contact.service';
import { Contact } from '../../Models/contact';
import { CommonModule } from '@angular/common';
import { ContactFilter } from '../../Models/Filters/contactFilter';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ContactAddComponent } from '../contact-add/contact-add.component';
import { MatProgressBar } from '@angular/material/progress-bar';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { ContactGroupService } from '../../Services/contact-group.service';
import { ContactTypeService } from '../../Services/contact-type.service';
import { ContactGroup } from '../../Models/contactGroup';
import { ContactType } from '../../Models/contactType';
import { ContactTypeComboComponent } from "../contact-type-combo/contact-type-combo.component";
import { SnackbarService } from '../../Services/snackbar.service';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-contact-landing',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatDialogModule,
    MatCardModule,
    CommonModule,
    MatProgressBar,
    MatPaginator,
    FormsModule,
    MatSelectModule,
    ContactTypeComboComponent
  ],
  templateUrl: './contact-landing.component.html',
  styleUrl: './contact-landing.component.css'
})
export class ContactLandingComponent implements OnInit {

  dataSource!: MatTableDataSource<Contact>;
  displayedColumns: string[] = [];
  isLoading: boolean = false;
  filter: ContactFilter = new ContactFilter();
  totalRecords: number = 0;
  contactTypes: ContactType[] = [];
  contactGroups: ContactGroup[] = [];
  contactTypeId: number = 0;

  constructor(
    private snackbarService: SnackbarService,
    private service: ContactService,
    private typeService: ContactTypeService,
    private groupService: ContactGroupService,
    private dialog: MatDialog) {

  }


  ngOnInit(): void {
    this.loadTypes();
    this.loadGroups();
    this.setColumn();
    this.initFilters();
    this.getContacts();
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
      error: (error: any) => {
        console.log(error.message);
      }
    });
  }
  setColumn() {
    this.displayedColumns = ['id', 'name', 'phoneNumber', 'type', 'group', 'action'];
  }
  initFilters() {

    this.filter.name = "";
    this.filter.phoneNumber = "";
  }



  add() {
    const dialogRef = this.dialog.open(ContactAddComponent, {
      position: { top: '100px' },
      data: {
        contact: new Contact()
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getContacts();
    });
  }
  edit(contact: any) {
    const dialogRef = this.dialog.open(ContactAddComponent, {
      position: { top: '100px' },
      data: {
        contact: contact
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getContacts();
    });

  }

  delete(id: number) {
    if (id>0) {
      const dialogRef = this.dialog.open(DeleteDialogComponent, {
        position: { top: '10px' },

      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.service.deleteContact(id).subscribe({
            next: () => {
              this.getContacts();
            }, error: (error: any) => {
              this.snackbarService.openError(error.error);
            }
          });
        }
      });
    }
  }
  onNameChange(event: any) {
    if (event)this.filter.name = event;
    this.getContacts();
  }
  onMobileChange(event: any) {
    if (event)this.filter.phoneNumber = event;
    this.getContacts();
  }
  onContactTypeFilterSelect(event: any) {
    if (event) this.filter.contactTypeId = event;
    this.getContacts();
  }
  onContactTypeInlineSelect(selectedId: number, contact: Contact) {
    if (selectedId > 0) {
      contact.contactTypeId = selectedId;
      this.service.updateContact(contact).subscribe({
        next: (res: any) => {
          this.snackbarService.openSuccess("Update Successfully");
        },
        error: (error: HttpErrorResponse) => {
          this.snackbarService.openError(error.error);
        }
      });
    }

  }
  onContactGroupChange(event: any) {
    if (event) this.filter.contactGroupId = event;
    this.getContacts();
  }

  pageChange(e: PageEvent) {
    this.filter.pageNumber = e.pageIndex + 1;
    this.filter.pageSize = e.pageSize;
    this.getContacts();

  }
  getContacts() {
    this.isLoading = true;
    this.service.getContacts(this.filter).subscribe({
      next: (res: any) => {
        this.totalRecords = res.totalItemCount;
        this.dataSource = new MatTableDataSource(res.subset);
        this.isLoading = false;
      },
      error: (error: any) => {
        this.dataSource = new MatTableDataSource();
        this.isLoading = false;
      }
    });
  }
}
