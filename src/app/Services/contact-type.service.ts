import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';
const subUrl = "ContactType/";
@Injectable({
  providedIn: 'root'
})
export class ContactTypeService extends BaseService {
  public getContactTypes(): Observable<any> {
    return super.getRequest(subUrl + "GetAll");
  }
}
