import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import LoginResponse from './model/loginResponse';
import Login from './model/Login';
import { Observable } from 'rxjs';
import { createVendor } from './model/createVendor';
import { CreateUser } from './model/CreateUser';
import { CreateRegisterResponse } from './model/CreateRegisterResponse';
import { SuccessResponse } from './model/SuccessResponse';
import { vendorListData } from './model/vendorListData';
import { UserListData } from './model/userListData';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(public http: HttpClient) { }

  loginUser(login: Login): Observable<LoginResponse> {

    return this.http.post<LoginResponse>('http://localhost:8082/login', login);

  }

  createNewVendor(vendor: createVendor): Observable<SuccessResponse> {
    let token = sessionStorage.getItem('token');
    let header = new HttpHeaders().set("Authorization", 'Bearer ' + token);
    return this.http.post<SuccessResponse>('http://localhost:8082/api/register', vendor, {
      headers: header
    });
  }

  createNewUser(user: CreateUser): Observable<CreateRegisterResponse> {
    return this.http.post<CreateRegisterResponse>('http://localhost:8082/registerUser', user);
  }

  registerVendor(vendor: createVendor): Observable<SuccessResponse> {
    return this.http.post<SuccessResponse>('http://localhost:8082/registerVendor', vendor);
  }

  showUsersListAdmin() {
    let token = sessionStorage.getItem('token');
    let header = new HttpHeaders().set("Authorization", 'Bearer ' + token);
    return this.http.get<UserListData>('http://localhost:8082/showUserList', {
      headers: header
    })
  }

  updateUserAdmin(data: any) {
    console.log("Data is: ", data);
    const token = sessionStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.patch<UserListData>('http://localhost:8082/updateUser', data, {
      headers: header
    })
  }

}
