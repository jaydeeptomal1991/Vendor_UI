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
import { ThemePalette } from '@angular/material/core';

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
  activeDays: number;
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
  selectedIndex: number = 1;
  date: Date | undefined = new Date;
  createVendor: FormGroup;
  displayedColumns: string[] = ['vendorName', 'vendorLicenseOwner', 'registrationNumber', 'gstNumber', 'vendorAddress', 'state', 'city', 'postalCode', 'phoneNumber', 'createdDate', 'activeDays', 'pendingRequest'];
  post: any;
  dataSource = new MatTableDataSource<Vendor>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  setDialog!: string;
  vendorId!: number;


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
    this.showVendorList();
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
    })
      .afterClosed()
      .subscribe(() => {
        let x = this.adminService.geAccepttVendorId();
        let y = x.split(' ');
        if (y[1] === 'Accept') {
          this.vendorService.updateVendor({ vendorId, pendingRequest: true });
        }
      })
  }

  rejectDialog(vendorId: number): void {
    this.dialog.open(DialogComponent, {
      width: '400px',
      height: '170px',
      data: {
        value: "REJECT",
        vendorId
      },
    })
      .afterClosed()
      .subscribe(() => console.log("Dialog box closed for vendor Id:: ", this.adminService.geAccepttVendorId()))

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
          let now = new Date();
          for (let i = 0; i < resp.data.length; i++) {
            let { createdDate } = resp.data[i];
            let now = new Date();
            const oneDay = 24 * 60 * 60 * 1000;
            const diffInTime = now.getTime() - new Date(createdDate).getTime();
            const x = Math.round(diffInTime / oneDay);
            let { activeDays } = resp.data[i];
            activeDays = x;
            console.log(activeDays);
          }
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

  }

}