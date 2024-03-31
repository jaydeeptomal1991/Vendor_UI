import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CreateUser } from 'src/app/model/CreateUser';
import { createVendor } from 'src/app/model/createVendor';
import { UserServiceService } from 'src/app/user-service.service';


@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {
  hide = true;
  isVendor: boolean = false;
  register: FormGroup;


  constructor(private userService: UserServiceService, private toasterService: ToastrService) {
    this.register = new FormGroup({
      name: new FormControl('', Validators.required),
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
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
      role: new FormControl('USER', Validators.required)
    })
  }

  requiredFieldMissing() {
    this.toasterService.error("ALL FIELDS ARE MANDATORY");
  }

  successMessageUser() {
    this.toasterService.success("SUCCESS::PENDING APPROVAL")
  }

  successMessageVendor() {
    this.toasterService.success("SUCCESS::PENDING APPROVAL")
  }
  serverError() {
    this.toasterService.error('INTERNAL SERVER ERROR')
  }


  roleSelected(role: any) {
    if (role === 'VENDOR') {
      this.isVendor = true;
    } else {
      this.isVendor = false;
    }
  }

  registerUser() {
    if (this.isVendor === false) {
      if (this.register.get('name')?.value === '' || this.register.get('username')?.value === '' || this.register.get('phoneNumber')?.value === '' || this.register.get('password')?.value === '') {
        this.requiredFieldMissing();
      } else {
        const userObj = new CreateUser();
        userObj.name = this.register.get('name')?.value;
        userObj.username = this.register.get('username')?.value;
        userObj.phoneNumber = this.register.get('phoneNumber')?.value;
        userObj.password = this.register.get('password')?.value;
        userObj.role = this.register.get('role')?.value;
        console.log(":::::: User object is:::::::", userObj);


        this.userService.createNewUser(userObj).subscribe(
          resp => {
            console.log(resp);
            if (resp.statusCode === 202) {
              this.successMessageUser();
            }
            else if (resp.statusCode === 409) {
              this.toasterService.error('USER ALREADY PRESENT')
            }
          },
          err => {
            console.log(err);
            this.serverError();
          }
        )
      }
    } else {
      if (this.register.get('vendorName')?.value === '' || this.register.get('vendorLicenseOwner')?.value === '' || this.register.get('registrationNumber')?.value === ''
        || this.register.get('gstNumber')?.value === '' || this.register.get('vendorAddress')?.value === '' || this.register.get('state')?.value === '' || this.register.get('city')?.value === ''
        || this.register.get('postalCode')?.value === '' || this.register.get('phoneNumber')?.value === '' || this.register.get('vendorUsername')?.value === '') {
        this.toasterService.error("ALL FIELDS ARE MANDATORY");
      } else {
        const vendorObj = new createVendor();
        vendorObj.vendorName = this.register.get('vendorName')?.value;
        vendorObj.vendorLicenseOwner = this.register.get('vendorLicenseOwner')?.value;
        vendorObj.registrationNumber = this.register.get('registrationNumber')?.value;
        vendorObj.gstNumber = this.register.get('gstNumber')?.value;
        vendorObj.vendorAddress = this.register.get('vendorAddress')?.value;
        vendorObj.state = this.register.get('state')?.value;
        vendorObj.city = this.register.get('city')?.value;
        vendorObj.postalCode = this.register.get('postalCode')?.value;
        vendorObj.phoneNumber = this.register.get('phoneNumber')?.value;
        vendorObj.vendorUsername = this.register.get('vendorUsername')?.value;
        vendorObj.role = 'VENDOR';
        console.log(":::::: Vendor object is:::::::", vendorObj);

        this.userService.registerVendor(vendorObj).subscribe(
          resp => {
            if (resp.statusCode === 200) {
              this.toasterService.success(resp.message)
            }
          }, err => {
            console.log(err);
            if (err.status === 401) {
              this.toasterService.error("UNAUTHORIZED");
            } else {
              this.toasterService.error(err.message);
            }
          }

        )
      }
    }
  }
}
