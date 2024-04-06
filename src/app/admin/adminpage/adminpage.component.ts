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
import { SharedService } from 'src/app/shared.service';
import { UsersData } from 'src/app/model/userData';

export interface Vendor {
  vendorId: number;
  userId: number;
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
  displayedColumnsUsers: string[] = ['name', 'username', 'phoneNumber', 'createdDate', 'activeDays', 'pendingRequest'];
  dataSourceUser = new MatTableDataSource<UsersData>;


  constructor(private userService: UserServiceService, private toaster: ToastrService, private vendorService: VendorService, public dialog: MatDialog, private adminService: AdminService, private sharedService: SharedService) {
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
    const obj = this.createVendor.get('gstNumber');
    obj?.valueChanges.subscribe(() => {
      obj.patchValue(obj.value.toUpperCase(), { emitEvent: false })
    })

    const obj1 = this.createVendor.get('vendorUsername');
    obj1?.valueChanges.subscribe(() => {
      obj1.patchValue(obj1.value.toLowerCase(), { emitEvent: false })
    })
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
          this.vendorService.updateVendor({ vendorId, pendingRequest: false })
            .subscribe(
              resp => {
                if (resp.statusCode === 200) {
                  let now = new Date();
                  for (let i = 0; i < resp.data.length; i++) {
                    let { createdDate } = resp.data[i];
                    let now = new Date();
                    const oneDay = 24 * 60 * 60 * 1000;
                    const diffInTime = now.getTime() - new Date(createdDate).getTime();
                    const x = Math.round(diffInTime / oneDay);
                    const Vendor = resp.data[i];
                    Vendor.activeDays = x;
                    resp.data[i] = Vendor;

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
        this.adminService.setAcceptVendorId(0, '');

      })
  }

  // User Accept Dialog
  acceptDialogUser(userId: number): void {
    this.dialog.open(DialogComponent, {
      width: '400px',
      height: '170px',
      data: {
        value: "ACCEPT",
        userId
      }
    })
      .afterClosed()
      .subscribe(() => {
        let x = this.adminService.getAcceptedUserId();
        let y = x.split(' ');
        if (y[1] === 'Accept') {
          this.userService.updateUserAdmin({ userId, pendingRequest: false })
            .subscribe(
              resp => {
                if (resp.statusCode === 200) {
                  // this.post = resp.data;
                  // this.dataSourceUser = new MatTableDataSource(this.post);
                  // this.dataSourceUser.paginator = this.paginator;

                  let now = new Date();
                  for (let i = 0; i < resp.data.length; i++) {
                    let { createdDate } = resp.data[i];
                    let now = new Date();
                    const oneDay = 24 * 60 * 60 * 1000;
                    const diffInTime = now.getTime() - new Date(createdDate).getTime();
                    const x = Math.round(diffInTime / oneDay);
                    const UsersData = resp.data[i];
                    UsersData.activeDays = x;
                    resp.data[i] = UsersData;
                    if (x == 1) {
                      this.sendNotification(userId);
                    }
                  }
                  this.showUserList();
                }
              }, err => {
                this.toaster.error("ERROR");
              }
            )
        }
        this.adminService.setAcceptUserId(0, '');
      })
  }

  rejectDialogUser(userId: number): void {
    this.dialog.open(DialogComponent, {
      width: '400px',
      height: '170px',
      data: {
        value: "REJECT",
        userId
      }
    })
      .afterClosed()
      .subscribe(() => {
        let x = this.adminService.getAcceptedUserId();
        let y = x.split(' ');
        if (y[1] === 'Accept') {
          this.userService.updateUserAdmin({ userId, pendingRequest: true })
            .subscribe(
              resp => {
                if (resp.statusCode === 200) {
                  // this.post = resp.data;
                  // this.dataSourceUser = new MatTableDataSource(this.post);
                  // this.dataSourceUser.paginator = this.paginator;
                  for (let i = 0; i < resp.data.length; i++) {
                    let { createdDate } = resp.data[i];
                    let now = new Date();
                    const oneDay = 24 * 60 * 60 * 1000;
                    const diffInTime = now.getTime() - new Date(createdDate).getTime();
                    const x = Math.round(diffInTime / oneDay);
                    const UsersData = resp.data[i];
                    UsersData.activeDays = x;
                    resp.data[i] = UsersData;
                    if (x == 1) {
                      this.sendNotification(userId);
                    }
                  }
                  this.showUserList();
                }
              }, err => {
                this.toaster.error("ERROR");
              }
            )
        }
        this.adminService.setAcceptUserId(0, '');

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
      .subscribe(() => {
        let x = this.adminService.geAccepttVendorId();
        let y = x.split(' ');
        if (y[1] === 'Accept') {
          this.vendorService.updateVendor({ vendorId, pendingRequest: true })
            .subscribe(
              resp => {
                if (resp.statusCode === 200) {
                  let now = new Date();
                  for (let i = 0; i < resp.data.length; i++) {
                    let { createdDate } = resp.data[i];
                    let now = new Date();
                    const oneDay = 24 * 60 * 60 * 1000;
                    const diffInTime = now.getTime() - new Date(createdDate).getTime();
                    const x = Math.round(diffInTime / oneDay);
                    const Vendor = resp.data[i];
                    Vendor.activeDays = x;
                    resp.data[i] = Vendor;

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
        this.adminService.setAcceptVendorId(0, '');
      })

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
    if (index === 2) {
      this.showVendorList();
    }
    else if (index === 3) {
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
            const Vendor = resp.data[i];
            Vendor.activeDays = x;
            resp.data[i] = Vendor;

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
    this.userService.showUsersListAdmin().subscribe(resp => {
      if (resp.statusCode === 200) {
        let now = new Date();
        for (let i = 0; i < resp.data.length; i++) {
          let { createdDate } = resp.data[i];
          let now = new Date();
          const oneDay = 24 * 60 * 60 * 1000;
          const diffInTime = now.getTime() - new Date(createdDate).getTime();
          const x = Math.round(diffInTime / oneDay);
          const UsersData = resp.data[i];
          UsersData.activeDays = x;
          resp.data[i] = UsersData;
          if (x == 1 && resp.data[i].pendingRequest === false) {
            this.sendNotification(resp.data[i].userId);
          }
        }
        this.post = resp.data;
        this.dataSourceUser = new MatTableDataSource(this.post);
        this.dataSource.paginator = this.paginator;
      }
    }, err => {
      console.log(err);
      this.toaster.error("ERROR");
    })
  }

  updateVendor() {

  }


  sendNotification(data: any) {
    console.log(":::::: Send Notification :::::::", data);
  }


}