import { Component } from '@angular/core';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdminService } from 'src/app/admin.service';
import { DialogMessage } from 'src/app/model/dialogModel';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {

  value: string = '';
  vendorId!: number;
  userId!: number;

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogMessage, private adminService: AdminService, private sharedService: SharedService) {
    this.value = data.value;
    this.vendorId = data.vendorId;
    this.userId = data.userId;
  }

  accept(vendorId: number, diag: string) {
    if (this.vendorId > 0) {
      this.adminService.setAcceptVendorId(vendorId, diag);
      this.sharedService.setData(vendorId);
    }
    else {
      this.adminService.setAcceptUserId(this.userId, diag);
    }
  }

  reject(vendorId: number, diag: string) {
    if (this.vendorId > 0) {
      this.adminService.updateVendorId(vendorId, diag);
    } else {
      this.adminService.updateUserId(this.userId, diag);
    }

  }
}
