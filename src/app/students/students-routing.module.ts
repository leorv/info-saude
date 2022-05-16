import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StudentsDetailsComponent } from './students-details/students-details.component';
import { StudentsEditComponent } from './students-edit/students-edit.component';
import { StudentsListComponent } from './students-list/students-list.component';

const routes: Routes = [
    { path: 'details/:id', component: StudentsDetailsComponent },
    { path: 'edit/:id', component: StudentsEditComponent },
    { path: '', component: StudentsListComponent},
    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentsRoutingModule { }
