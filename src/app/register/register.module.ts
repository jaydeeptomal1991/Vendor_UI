import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { RegisterRoutingModule } from './register-routing.module';
import { RegisterPageComponent } from './register-page/register-page.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    RegisterPageComponent
  ],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    ReactiveFormsModule,
    AngularMaterialModule
  ]
})
export class RegisterModule { }
