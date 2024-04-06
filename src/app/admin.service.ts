import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  vendor_id!: number;
  diag!: string;

  constructor() { }

  setAcceptVendorId(vendorId: number, diag: string) {
    this.vendor_id = vendorId;
    this.diag = diag;
  }

  geAccepttVendorId() {
    return this.vendor_id + " " + this.diag;
  }

  updateVendorId(vendorId: number, diag: string) {
    this.vendor_id = 0;
    this.diag = '';
  }
}
