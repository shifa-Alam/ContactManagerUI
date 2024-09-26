import { BaseModel } from "./baseModel";

export class Contact extends BaseModel {
    name?: string='';
    phoneNumber?: string='';
    contactTypeId?: number;
    contactGroupId?: number;
  }
  