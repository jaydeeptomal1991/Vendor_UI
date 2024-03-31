import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VendorPageComponent } from './vendor-page/vendor-page.component';

const routes: Routes = [
  { path: 'dashboard', component: VendorPageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VendorRoutingModule { }
