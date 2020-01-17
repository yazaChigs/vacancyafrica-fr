import { BaseModel } from './base.model';

export class PaymentType extends BaseModel {
  name?: string;
  description?: string;
  amount?: number;
  paymentNote?: string;
}
