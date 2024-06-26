import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { vendorListData } from './model/vendorListData';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VendorService {

  constructor(private http: HttpClient) { }


  showVendorList(): Observable<vendorListData> {
    let token = sessionStorage.getItem('token');
    let header = new HttpHeaders().set("Authorization", 'Bearer ' + token);
    return this.http.get<vendorListData>('http://localhost:8082/api/showVendorList', {
      headers: header
    });
  }

  updateVendor(data: any) {
    console.log("Data is: ", data);
    const token = sessionStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.patch<vendorListData>('http://localhost:8082/api/updateVendor', data, {
      headers: header
    })
  }
}
