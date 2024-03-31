import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserServiceService } from 'src/app/user-service.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css']
})
export class LoginUserComponent {

  loginUser: FormGroup;
  hide = true;

  constructor(private userService: UserServiceService, private toasterService: ToastrService, private router: Router) {
    this.loginUser = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    })
  }

  get username() {
    return this.loginUser.get('username');
  }

  get password() {
    return this.loginUser.get('password');
  }

  success() {
    this.toasterService.success('SUCCESS');
  }

  authFailed() {
    this.toasterService.error('AUTHENTICATION FAILED');
  }

  serverError() {
    this.toasterService.error('INTERNAL SERVER ERROR')
  }

  onSubmit() {
    this.userService.loginUser(this.loginUser.value).subscribe(
      resp => {
        if (resp.statusCode === 202) {
          this.success();
          sessionStorage.setItem('name', resp.name);
          sessionStorage.setItem('role', resp.role);
          sessionStorage.setItem('enabled', `${resp.enabled}`);
          sessionStorage.setItem('token', resp.token);
          if (resp.role === 'ADMIN') {
            this.router.navigate(['admin/adminDashboard']);
          } else if (resp.role === 'VENDOR') {
            this.router.navigate(['vendor/dashboard'])
          }
        }
        else if (resp.statusCode === 401) {
          this.authFailed();
        }
        else if (resp.statusCode === 423) {
          this.toasterService.error("FAIL:: PENDING APPROVAL");
        }
      }, err => {
        this.serverError();
      }
    )
  }

}
