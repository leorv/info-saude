import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { VaccinesRoutingModule } from './vaccines-routing.module';
import { VaccinesListComponent } from './vaccines-list/vaccines-list.component';
import { VaccinesEditComponent } from './vaccines-edit/vaccines-edit.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { VaccinesCreateComponent } from './vaccines-create/vaccines-create.component';
import { VaccinesTakenComponent } from './vaccines-taken/vaccines-taken.component';
import { VaccinesTakenEditComponent } from './vaccines-taken-edit/vaccines-taken-edit.component';
import { VaccinesTakenCreateComponent } from './vaccines-taken-create/vaccines-taken-create.component';



@NgModule({
    declarations: [
        VaccinesListComponent,
        VaccinesEditComponent,
        VaccinesCreateComponent,
        VaccinesTakenComponent,
        VaccinesTakenEditComponent,
        VaccinesTakenCreateComponent
    ],
    imports: [
        CommonModule,
        VaccinesRoutingModule,
        ReactiveFormsModule,
        BsDatepickerModule.forRoot(),
    ],
    exports: [
        VaccinesTakenComponent,
        VaccinesTakenCreateComponent
    ]
})
export class VaccinesModule { }
