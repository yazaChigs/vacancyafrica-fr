import { BaseModel } from './base.model';
import { PaymentType } from './payment-type.model';

export class PaymentReceived extends BaseModel {
  paymentType?: PaymentType;
  paymentDescription?: string;
  amount?: number;
  paymentNote?: string;
  reference?: string;
  constructor() {
    super();
  }
}
