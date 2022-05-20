import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
    {
        path: 'students',
        loadChildren: () => import('./students/students.module').then(mod => mod.StudentsModule)
    },
    {
        path: 'vaccines',
        loadChildren: () => import('./vaccines/vaccines.module').then(mod => mod.VaccinesModule)
    },
    { 
        path: 'events',
        loadChildren: () => import('./events/events.module').then(mod => mod.EventsModule)
    },
    { path: '', pathMatch: 'full', redirectTo: 'students'},
    { path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
