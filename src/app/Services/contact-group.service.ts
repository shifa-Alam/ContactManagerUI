import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';
const subUrl = "ContactGroup/";
@Injectable({
  providedIn: 'root'
})
export class ContactGroupService extends BaseService {


  public getContactGroups(): Observable<any> {
    return super.getRequest(subUrl + "GetAll");
  }
}
