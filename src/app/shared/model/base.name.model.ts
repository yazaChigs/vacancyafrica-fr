import { BaseNameType } from '../enum/base-name-type.enum';


export class BaseNameModel {
  id: number;
  createdById: number;
  createdByName: string;
  version: number;
  uuid: string;
  dateCreated: Date;
  name: string;
  description: string;
}
