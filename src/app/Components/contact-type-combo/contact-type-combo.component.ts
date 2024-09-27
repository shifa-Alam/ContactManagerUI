import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { ContactTypeService } from '../../Services/contact-type.service';
import { ContactType } from '../../Models/contactType';
@Component({
  selector: 'app-contact-type-combo',
  standalone: true,
  imports: [MatSelectModule],
  templateUrl: './contact-type-combo.component.html',
  styleUrl: './contact-type-combo.component.css'
})
export class ContactTypeComboComponent implements OnInit {
  @Input() value: number = 0;
  @Input() required: boolean = false;
  @Output() onSelect = new EventEmitter<number>();
  contactTypes: ContactType[] = [];
  constructor(public typeService: ContactTypeService) {

  }
  ngOnInit(): void {
    this.loadTypes();
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

  onSelected(event: any) {
    this.onSelect.emit(event);
  }
}
