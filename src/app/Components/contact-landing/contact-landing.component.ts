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
    MatSelectModule


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

  constructor(
    private service: ContactService,
    public typeService: ContactTypeService,
    public groupService: ContactGroupService,
    public dialog: MatDialog) {

  }


  ngOnInit(): void {
    this.loadTypes();
    this.loadGroups();
    this.setColumn();
    this.initFilters();
    this.getContacts();
  }
  loadTypes() {
    this.typeService.getAll().subscribe(result => {
      this.contactTypes = result;
      console.log(result);
    },
      error => {
      }
    );
  }

  loadGroups() {
    this.groupService.getAll().subscribe(result => {
      this.contactGroups = result;
    },
      error => {
      }
    );
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
    if (id) {
      const dialogRef = this.dialog.open(DeleteDialogComponent, {
        position: { top: '10px' },
        // width:'20%'
      });

      dialogRef.afterClosed().subscribe(result => {

        if (result) {
          this.service.deleteContact(id).subscribe(result => {
            this.getContacts();
          },
            error => console.error(error));
        }
      });
    }
  }
  onNameChange(event: any) {
    if (event)
      this.filter.name = event;
    this.getContacts();
  }
  onMobileChange(event: any) {
    if (event)
      this.filter.phoneNumber = event;
    this.getContacts();
  }
  onContactTypeChange(event: any){
    if (event)
      this.filter.contactTypeId = event;
    this.getContacts();
  }
  onContactGroupChange(event: any){
    if (event)
      this.filter.contactGroupId = event;
    this.getContacts();
  }
  pageChange(e: PageEvent) {
    this.filter.pageNumber = e.pageIndex + 1;
    this.filter.pageSize = e.pageSize;
    this.getContacts();

  }
  getContacts() {
    this.isLoading = true;
    this.service.getContacts(this.filter).subscribe(result => {
      this.totalRecords = result.totalItemCount;
      this.dataSource = new MatTableDataSource(result.subset);
      this.isLoading = false;
      console.log(result.subset);
    },
      error => {
        this.dataSource = new MatTableDataSource();
        this.isLoading = false;
      }
    );
  }
}
