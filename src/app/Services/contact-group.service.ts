import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';
import { ContactGroupFilter } from '../Models/Filters/contactGroupFilter';
import { ContactGroup } from '../Models/contactGroup';
const subUrl = "ContactGroup/";
@Injectable({
  providedIn: 'root'
})
export class ContactGroupService extends BaseService {


  getAll(): Observable<any> {
    return super.getRequest(subUrl + "GetAll");
  }

  getContactGroups(filter: ContactGroupFilter): Observable<any> {
    return super.getRequest(subUrl + "GetContactGroups", filter);
  }
  saveContactGroup(contact: ContactGroup): Observable<any> {
    return super.postRequest(subUrl + "SaveContactGroup", contact);
  }
  updateContactGroup(contact: ContactGroup): Observable<any> {
    return super.postRequest(subUrl + "UpdateContactGroup", contact);
  }
  deleteContactGroup(id: number): Observable<any> {
    return super.deleteRequest(subUrl + "DeleteContactGroup", id);
  }
}
