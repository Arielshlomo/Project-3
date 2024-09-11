import { Routes } from '@angular/router';
import { PersonsListComponent } from './persons-management/persons-list/persons-list.component';
import { PersonFormComponent } from './persons-management/person-form/person-form.component';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'language-game' },
    { path: 'person/list', component: PersonsListComponent },
    { path: 'person/:id', component: PersonFormComponent },
    { path: 'newperson', component: PersonFormComponent },
    { path: 'language-game', loadChildren: () => import('./langauge-game/language-game.routing').then(mod => mod.languageGameRoutes) },
];
