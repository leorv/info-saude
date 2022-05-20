import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventsListComponent } from './event-list/event-list.component';
import { EventCreateComponent } from './event-create/event-create.component';
import { EventDetailsComponent } from './event-details/event-details.component';
import { EventEditComponent } from './event-edit/event-edit.component';

import { EventsRoutingModule } from './events-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { EventListByStudentComponent } from './event-list-by-student/event-list-by-student.component';


@NgModule({
    declarations: [
        EventsListComponent,
        EventCreateComponent,
        EventDetailsComponent,
        EventEditComponent,
        EventListByStudentComponent
    ],
    imports: [
        CommonModule,
        EventsRoutingModule,
        ReactiveFormsModule,
        BsDatepickerModule.forRoot(),
    ],
    exports: [
        EventCreateComponent,
        EventEditComponent,
        EventListByStudentComponent
    ]
})
export class EventsModule { }
