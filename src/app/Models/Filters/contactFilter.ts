import { BaseFilter } from "./baseFilter";

export class ContactFilter extends BaseFilter {
  name: string = "";
  phoneNumber: string = "";
  contactTypeId: number = 0;
  contactGroupId: number = 0;

}
