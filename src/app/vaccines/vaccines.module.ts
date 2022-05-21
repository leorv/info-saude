import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { VaccinesRoutingModule } from './vaccines-routing.module';
import { VaccinesListComponent } from './vaccines-list/vaccines-list.component';
import { VaccinesListByStudentComponent } from './vaccines-list-by-student/vaccines-list-by-student.component';
import { VaccinesEditComponent } from './vaccines-edit/vaccines-edit.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { VaccinesCreateComponent } from './vaccines-create/vaccines-create.component';



@NgModule({
    declarations: [
        VaccinesListComponent,
        VaccinesListByStudentComponent,
        VaccinesEditComponent,
        VaccinesCreateComponent
    ],
    imports: [
        CommonModule,
        VaccinesRoutingModule,
        ReactiveFormsModule,
        BsDatepickerModule.forRoot(),
    ]
})
export class VaccinesModule { }
