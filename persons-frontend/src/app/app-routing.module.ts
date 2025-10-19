import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonListComponent } from './components/person-list/person-list.component';
import { PersonFormComponent } from './components/person-form/person-form.component';
import { PersonDetailComponent } from './components/person-detail/person-detail.component';

const routes: Routes = [
    { path: '', redirectTo: '/persons', pathMatch: 'full' },
    { path: 'persons', component: PersonListComponent },
    { path: 'person/new', component: PersonFormComponent },
    { path: 'person/edit/:id', component: PersonFormComponent },
    { path: 'person/:id', component: PersonDetailComponent },
    { path: '**', redirectTo: '/persons' } // Wildcard route for 404 cases
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }