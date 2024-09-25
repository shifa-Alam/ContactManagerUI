import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';
import { ContactFilter } from '../Models/Filters/contactFilter';
import { Contact } from '../Models/contact';
const subUrl = "Contact/";
@Injectable({
  providedIn: 'root'
})
export class ContactService extends BaseService {

  public getContacts(filter: ContactFilter): Observable<any> {
    return super.getRequest(subUrl + "GetContacts",filter);
  }
  saveContact(contact: Contact): Observable<any> {
    return super.postRequest(subUrl + "SaveContact", contact);
  }
  updateContact(contact: Contact): Observable<any> {
    return super.postRequest(subUrl + "UpdateContact", contact);
  }
  public deleteContact(id:number): Observable<any> {
    return super.deleteRequest(subUrl + "DeleteContact", id);
  }
}
