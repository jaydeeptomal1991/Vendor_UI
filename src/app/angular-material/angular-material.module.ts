import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

const materialComponents = [
  MatButtonModule,
  MatIconModule,
  MatInputModule,
  MatCardModule,
  MatTabsModule,
  MatFormFieldModule, MatSelectModule, MatTableModule, MatPaginatorModule
]

@NgModule({
  imports: [
    materialComponents
  ],
  exports: [
    materialComponents
  ]
})
export class AngularMaterialModule { }
