import { RouterModule, Routes } from '@angular/router';
import { CategoryFormComponent } from './category-form/category-form.component';
import { CategoryTableComponent } from './category-table/category-table.component';
import { PlayingGameComponent } from './playing-game/playing-game.component';
import { StartGameComponent } from './start-game/start-game.component';
import { NgModule } from '@angular/core';
import { MatchingWordComponent } from './matching-game/matching-word/matching-word.component';
import { ScrambledWordComponent } from './scramble-word/scrambled-word/scrambled-word.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { HelpQuestionComponent } from '../help-question/help-question.component';

export const languageGameRoutes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'game-mode/start' },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'help', component: HelpQuestionComponent },
    { path: 'category', component: CategoryTableComponent },
    { path: 'category-form', component: CategoryFormComponent },
    { path: 'category-form/:id', component: CategoryFormComponent },
    { path: 'game-mode/start', component: StartGameComponent },
    { path: 'game-mode/translation', component: PlayingGameComponent },
    { path: 'game-mode/translation/:id', component: PlayingGameComponent },
    { path: 'game-mode/match', component: MatchingWordComponent },
    { path: 'game-mode/match/:id', component: MatchingWordComponent },
    { path: 'game-mode/scramble', component: ScrambledWordComponent },
    { path: 'game-mode/scramble/:id', component: ScrambledWordComponent },
];