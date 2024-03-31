import { Component } from '@angular/core';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdminService } from 'src/app/admin.service';
import { DialogMessage } from 'src/app/model/dialogModel';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {

  value: string = '';
  vendorId!: number;

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogMessage, private adminService: AdminService) {
    this.value = data.value;
    this.vendorId = data.vendorId;
  }

  action(vendorId: number) {
    console.log("Vendor Id is: ", vendorId);
    this.adminService.setVendorId(vendorId);
  }
}
