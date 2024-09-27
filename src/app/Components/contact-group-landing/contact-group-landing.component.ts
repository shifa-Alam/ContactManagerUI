import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Contact } from '../../Models/contact';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { ContactGroupFilter } from '../../Models/Filters/contactGroupFilter';
import { ContactGroupService } from '../../Services/contact-group.service';
import { ContactGroup } from '../../Models/contactGroup';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBar } from '@angular/material/progress-bar';
import { ContactGroupAddComponent } from '../contact-group-add/contact-group-add.component';
import { FormsModule } from '@angular/forms';
import { SnackbarService } from '../../Services/snackbar.service';

@Component({
  selector: 'app-contact-group-landing',
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
    FormsModule
  ],
  templateUrl: './contact-group-landing.component.html',
  styleUrl: './contact-group-landing.component.css'
})
export class ContactGroupLandingComponent implements OnInit {
  dataSource!: MatTableDataSource<ContactGroup>;
  displayedColumns: string[] = [];
  isLoading: boolean = false;
  filter: ContactGroupFilter = new ContactGroupFilter();
  totalRecords: number = 0;
  constructor(
    private snackbarService: SnackbarService,
    private service: ContactGroupService,
    public dialog: MatDialog
  ) {

  }


  ngOnInit(): void {
    this.setColumn();
    this.initFilters();
    this.getContactGroups();
  }
  setColumn() {
    this.displayedColumns = ['id', 'name', 'createdDate', 'modifiedDate', 'action'];
  }
  initFilters() {

    this.filter.name = "";
  }



  add() {
    const dialogRef = this.dialog.open(ContactGroupAddComponent, {
      position: { top: '100px' },
      data: {
        contactGroup: new ContactGroup()
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getContactGroups();
    });
  }
  edit(contactGroup: any) {
    const dialogRef = this.dialog.open(ContactGroupAddComponent, {
      position: { top: '100px' },
      data: {
        contactGroup: contactGroup
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getContactGroups();
    });

  }

  delete(id: number) {
    if (id > 0) {
      const dialogRef = this.dialog.open(DeleteDialogComponent, {
        position: { top: '10px' },

      });

      dialogRef.afterClosed().subscribe(result => {

        if (result) {
          this.service.deleteContactGroup(id).subscribe({
            next: () => {
              this.snackbarService.openSuccess("Deleted Successfully");
              this.getContactGroups();
            }, error: (error: any) => {
              this.snackbarService.openError(error.error);
            }
          });
        }
      });
    }
  }
  onNameChange(event: any) {
    if (event) this.filter.name = event;
    this.getContactGroups();
  }

  pageChange(e: PageEvent) {
    this.filter.pageNumber = e.pageIndex + 1;
    this.filter.pageSize = e.pageSize;
    this.getContactGroups();

  }
  getContactGroups() {
    this.isLoading = true;
    this.service.getContactGroups(this.filter).subscribe({
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
