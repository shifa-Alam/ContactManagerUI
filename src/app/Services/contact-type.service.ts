import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';
import { ContactType } from '../Models/contactType';
import { ContactTypeFilter } from '../Models/Filters/contactTypeFilter';
const subUrl = "ContactType/";
@Injectable({
  providedIn: 'root'
})
export class ContactTypeService extends BaseService {
  public getAll(): Observable<any> {
    return super.getRequest(subUrl + "GetAll");
  }

  getContactTypes(filter: ContactTypeFilter): Observable<any> {
    return super.getRequest(subUrl + "GetContactTypes", filter);
  }
  saveContactType(contact: ContactType): Observable<any> {
    return super.postRequest(subUrl + "SaveContactType", contact);
  }
  updateContactType(contact: ContactType): Observable<any> {
    return super.postRequest(subUrl + "UpdateContactType", contact);
  }
  deleteContactType(id: number): Observable<any> {
    return super.deleteRequest(subUrl + "DeleteContactType", id);
  }
}
