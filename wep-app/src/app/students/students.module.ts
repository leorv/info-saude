import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentsRoutingModule } from './students-routing.module';
import { StudentsListComponent } from './students-list/students-list.component';
import { StudentsCreateComponent } from './students-create/students-create.component';
import { StudentsDetailsComponent } from './students-details/students-details.component';


@NgModule({
  declarations: [
    StudentsListComponent,
    StudentsCreateComponent,
    StudentsDetailsComponent
  ],
  imports: [
    CommonModule,
    StudentsRoutingModule
  ]
})
export class StudentsModule { }
