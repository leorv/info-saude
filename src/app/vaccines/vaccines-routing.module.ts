import { VaccinesListComponent } from './vaccines-list/vaccines-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VaccinesEditComponent } from './vaccines-edit/vaccines-edit.component';
import { VaccinesCreateComponent } from './vaccines-create/vaccines-create.component';
import { VaccinesTakenEditComponent } from './vaccines-taken-edit/vaccines-taken-edit.component';
import { VaccinesTakenCreateComponent } from './vaccines-taken-create/vaccines-taken-create.component';

const routes: Routes = [
    { path: 'create', component: VaccinesCreateComponent },
    { path: 'edit/:id', component: VaccinesEditComponent },
    { path: 'vaccines-taken/edit/:id', component: VaccinesTakenEditComponent },
    { path: 'vaccines-taken/create', component: VaccinesTakenCreateComponent },
    { path: '', component: VaccinesListComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class VaccinesRoutingModule { }
