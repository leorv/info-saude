import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

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
    { path: 'home', component: HomeComponent },
    { path: '', pathMatch: 'full', redirectTo: 'home'},
    { path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
