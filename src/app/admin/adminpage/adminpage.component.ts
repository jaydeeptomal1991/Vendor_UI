import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { ToastrService } from 'ngx-toastr';
import { UserServiceService } from 'src/app/user-service.service';
import { VendorService } from 'src/app/vendor.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {
  MatDialog,
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { AdminService } from 'src/app/admin.service';

export interface Vendor {
  vendorId: number;
  vendorName: string;
  vendorLicenseOwner: string;
  registrationNumber: string;
  gstNumber: string;
  vendorAddress: string;
  state: string;
  city: string;
  postalCode: string;
  phoneNumber: string;
  vendorUsername: string;
  createdDate: Date;
  updatedDate: Date;
  role: string;
  pendingRequest: boolean;
  enabled: boolean;
  passwordChangedFirst: boolean;
}

@Component({
  selector: 'app-adminpage',
  templateUrl: './adminpage.component.html',
  styleUrls: ['./adminpage.component.css']
})

export class AdminpageComponent {

  color: string = 'white';
  backgroundColor: string = 'pink';
  date: Date | undefined = new Date;
  createVendor: FormGroup;
  displayedColumns: string[] = ['vendorName', 'vendorLicenseOwner', 'registrationNumber', 'gstNumber', 'vendorAddress', 'state', 'city', 'postalCode', 'phoneNumber', 'createdDate', 'pendingRequest'];
  post: any;
  dataSource = new MatTableDataSource<Vendor>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;


  constructor(private userService: UserServiceService, private toaster: ToastrService, private vendorService: VendorService, public dialog: MatDialog, private adminService: AdminService) {
    this.createVendor = new FormGroup({
      vendorName: new FormControl('', Validators.required),
      vendorLicenseOwner: new FormControl('', Validators.required),
      registrationNumber: new FormControl('', Validators.required),
      gstNumber: new FormControl('', Validators.required),
      vendorAddress: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      postalCode: new FormControl('', Validators.required),
      phoneNumber: new FormControl('', Validators.required),
      vendorUsername: new FormControl('', Validators.required),
      role: new FormControl('VENDOR', Validators.required)
    });
  }


  // Dialog
  acceptDialog(vendorId: number): void {
    this.dialog.open(DialogComponent, {
      width: '400px',
      height: '170px',
      data: {
        value: "ACCEPT",
        vendorId
      }
    });
  }

  rejectDialog(vendorId: number): void {
    this.dialog.open(DialogComponent, {
      width: '400px',
      height: '170px',
      data: {
        value: "REJECT",
        vendorId
      }
    });
  }


  submit() {
    this.userService.createNewVendor(this.createVendor.value).subscribe(
      resp => {
        if (resp.statusCode === 200) {
          this.toaster.success(resp.message)
          this.createVendor.reset();
        }
      }, err => {
        if (err.status === 401) {
          this.toaster.error("UNAUTHORIZED");
        } else {
          this.toaster.error(err.message);
        }
      }
    )
  }

  logout() {
    sessionStorage.clear();
  }

  onChange(tab: MatTabChangeEvent) {
    let { index } = tab;
    if (index === 1) {
      this.showVendorList();
    }
    else if (index === 2) {
      this.showUserList();
    }
  }
  showVendorList() {
    this.vendorService.showVendorList().subscribe(
      resp => {
        if (resp.statusCode === 200) {
          this.post = resp.data;
          this.dataSource = new MatTableDataSource(this.post);
          this.dataSource.paginator = this.paginator;
        }
      }, err => {
        this.toaster.error("ERROR");
      }
    )
  }



  showUserList() {

  }

  updateVendor() {
    let vendorId = this.adminService.getVendorId();
    console.log("Pending update Vendor Id: ", vendorId);
  }

}