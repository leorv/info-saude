import { VaccinesListComponent } from './vaccines-list/vaccines-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VaccinesEditComponent } from './vaccines-edit/vaccines-edit.component';
import { VaccinesCreateComponent } from './vaccines-create/vaccines-create.component';

const routes: Routes = [
    { path: 'create', component: VaccinesCreateComponent },
    { path: 'edit/:id', component: VaccinesEditComponent },
    { path: '', component: VaccinesListComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class VaccinesRoutingModule { }
