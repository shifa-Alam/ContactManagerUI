import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ContactType } from '../../Models/contactType';
import { ContactTypeFilter } from '../../Models/Filters/contactTypeFilter';
import { ContactTypeService } from '../../Services/contact-type.service';
import { ContactTypeAddComponent } from '../contact-type-add/contact-type-add.component';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBar } from '@angular/material/progress-bar';
import { FormsModule } from '@angular/forms';
import { SnackbarService } from '../../Services/snackbar.service';

@Component({
  selector: 'app-contact-type-landing',
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
  templateUrl: './contact-type-landing.component.html',
  styleUrl: './contact-type-landing.component.css'
})
export class ContactTypeLandingComponent implements OnInit {
  dataSource!: MatTableDataSource<ContactType>;
  displayedColumns: string[] = [];
  isLoading: boolean = false;
  filter: ContactTypeFilter = new ContactTypeFilter();
  totalRecords: number = 0;
  isInlineEdit: boolean = false;
  constructor(
    private snackbarService: SnackbarService,
    private service: ContactTypeService,
    public dialog: MatDialog
  ) {

  }


  ngOnInit(): void {
    this.setColumn();
    this.initFilters();
    this.getContactTypes();
  }
  setColumn() {
    this.displayedColumns = ['id', 'name', 'createdDate', 'modifiedDate', 'action'];
  }
  initFilters() {
    this.filter.name = "";
  }

  inlineEdit(event: any) {
    event.inlineEdit = true;
    
  }
  inlineUpdate(event: any) {
    event.inlineEdit = false;
    this.service.updateContactType(event).subscribe({
      next: (res: any) => {
        this.snackbarService.openSuccess("Update Successfully");
      },
      error: (error: any) => {
        this.snackbarService.openError(error.error);
        this.getContactTypes();
      }
    });
  }
  add() {
    const dialogRef = this.dialog.open(ContactTypeAddComponent, {
      position: { top: '100px' },
      data: {
        contactType: new ContactType()
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getContactTypes();
    });
  }
  edit(contactType: any) {
    const dialogRef = this.dialog.open(ContactTypeAddComponent, {
      position: { top: '100px' },
      data: {
        contactType: contactType
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getContactTypes();
    });

  }

  delete(id: number) {
    if (id > 0) {
      const dialogRef = this.dialog.open(DeleteDialogComponent, {
        position: { top: '10px' },

      });

      dialogRef.afterClosed().subscribe(result => {

        if (result) {
          this.service.deleteContactType(id).subscribe({
            next: () => {
              this.getContactTypes();
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

    this.getContactTypes();
  }

  pageChange(e: PageEvent) {
    this.filter.pageNumber = e.pageIndex + 1;
    this.filter.pageSize = e.pageSize;
    this.getContactTypes();

  }
  getContactTypes() {
    this.isLoading = true;
    this.service.getContactTypes(this.filter).subscribe({
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
