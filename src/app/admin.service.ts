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

  setRejectVendorId(vendorId: number, diag: string) {
    this.vendor_id = vendorId;
    this.diag = diag;
  }

  getRejectVendorId() {
    return this.vendor_id + " " + this.diag;
  }

}
