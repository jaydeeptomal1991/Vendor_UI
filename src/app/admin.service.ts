import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  vendor_id!: number;
  diag!: string;

  user_id!: number;
  diag_user!: string;

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

  setAcceptUserId(userId: number, diag: string) {
    this.user_id = userId;
    this.diag_user = diag;
  }

  getAcceptedUserId() {
    return this.user_id + " " + this.diag_user;
  }

  updateUserId(userId: number, diag: string) {
    this.user_id = 0;
    this.diag_user = '';
  }
}
