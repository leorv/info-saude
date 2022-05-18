import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventsListComponent } from './event-list/event-list.component';
import { EventCreateComponent } from './event-create/event-create.component';
import { EventDetailsComponent } from './event-details/event-details.component';
import { EventEditComponent } from './event-edit/event-edit.component';

import { EventsRoutingModule } from './events-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';


@NgModule({
    declarations: [
        EventsListComponent,
        EventCreateComponent,
        EventDetailsComponent,
        EventEditComponent
    ],
    imports: [
        CommonModule,
        EventsRoutingModule,
        ReactiveFormsModule,
        BsDatepickerModule.forRoot(),
    ]
})
export class EventsModule { }
