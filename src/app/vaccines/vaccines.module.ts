import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VaccinesRoutingModule } from './vaccines-routing.module';
import { VaccinesListComponent } from './vaccines-list/vaccines-list.component';
import { VaccinesListByStudentComponent } from './vaccines-list-by-student/vaccines-list-by-student.component';
import { VaccinesEditComponent } from './vaccines-edit/vaccines-edit.component';
import { VaccinesDetailsComponent } from './vaccines-details/vaccines-details.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
    declarations: [
        VaccinesListComponent,
        VaccinesListByStudentComponent,
        VaccinesEditComponent,
        VaccinesDetailsComponent
    ],
    imports: [
        CommonModule,
        VaccinesRoutingModule,
        ReactiveFormsModule,
        BsDatepickerModule.forRoot(),
    ]
})
export class VaccinesModule { }
