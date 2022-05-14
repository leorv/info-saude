import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [
    { 
        path: 'students',
        loadChildren: () => import('./students/students.module').then(mod => mod.StudentsModule)
    },
    { path: '', pathMatch: 'full', redirectTo: 'students'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
