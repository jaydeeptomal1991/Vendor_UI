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

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogMessage, private adminService: AdminService, private sharedService: SharedService) {
    this.value = data.value;
    this.vendorId = data.vendorId;
  }

  accept(vendorId: number, diag: string) {
    this.adminService.setAcceptVendorId(vendorId, diag);
    this.sharedService.setData(vendorId);
  }

  reject(vendorId: number, diag: string) {
    this.adminService.updateVendorId(vendorId, diag);
  }
}
