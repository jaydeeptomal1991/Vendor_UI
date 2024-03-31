import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from '../angular-material/angular-material.module'
import { VendorRoutingModule } from './vendor-routing.module';
import { VendorPageComponent } from './vendor-page/vendor-page.component';


@NgModule({
  declarations: [
    VendorPageComponent
  ],
  imports: [
    CommonModule,
    VendorRoutingModule,
    AngularMaterialModule
  ]
})
export class VendorModule { }
