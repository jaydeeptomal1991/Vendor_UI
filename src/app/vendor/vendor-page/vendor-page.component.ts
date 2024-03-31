import { Component } from '@angular/core';

@Component({
  selector: 'app-vendor-page',
  templateUrl: './vendor-page.component.html',
  styleUrls: ['./vendor-page.component.css']
})
export class VendorPageComponent {

  logout() {
    sessionStorage.clear();
  }

}
