import { EventsListComponent } from './event-list/event-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventEditComponent } from './event-edit/event-edit.component';
import { EventDetailsComponent } from './event-details/event-details.component';
import { EventCreateComponent } from './event-create/event-create.component';


const routes: Routes = [
    { path: 'create', component: EventCreateComponent },
    { path: 'details/:id', component: EventDetailsComponent },
    { path: 'edit/:id', component: EventEditComponent },
    { path: '', component: EventsListComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EventsRoutingModule { }
