import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  vendor_id!: number;

  constructor() { }

  setVendorId(vendorId: number) {
    this.vendor_id = vendorId;
  }

  getVendorId() {
    return this.vendor_id;
  }


}
