import { Routes } from '@angular/router';
import { SurveyListComponent } from './page/survey-list/survey-list.component';
import { SurveyResultComponent } from './page/survey-result/survey-result.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'surveys',
    pathMatch: 'full',
  },
  {
    path: 'surveys',
    component: SurveyListComponent,
  },
  {
    path: 'surveys/:id/result',
    component: SurveyResultComponent,
  },
];
