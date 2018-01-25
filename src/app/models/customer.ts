import { Timestamp } from "rxjs/operators/timestamp";
import { Time } from "@angular/common/src/i18n/locale_data_api";

export class Customer {
  id: number;
  nick: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(obj: any) {
    this.id        = obj && obj.id         || null;
    this.nick      = obj && obj.nick       || '';
    this.name      = obj && obj.name       || '';
    this.createdAt = obj && obj.created_at && obj.created_at || null;
    this.updatedAt = obj && obj.updated_at && obj.updated_at || null;
  };

  // price_rub_kg(): number {
  //     return 44;
  // };
}
