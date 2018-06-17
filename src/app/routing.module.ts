import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      {
        path: 'home'
      },
      {
        path: 'viewAssociates'
      },
      {
        path: 'myBatches'
      },
      {
        path: 'allBatches'
      },
      {
        path: 'editBatches'
      },
      {
        path: 'home'
      },
      {
        path: 'boom'
      },
      {
        path: '**',
        pathMatch: 'full',
        redirectTo: '/home'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoutingModule {}
