import { Routes } from '@angular/router';
import { AppComponent } from './app/app.component';
import { HomeComponent } from './app/components/home/home.component';
import { AssociatesComponent } from './app/components/associates/associates.component';
import { BatchesComponent } from './app/components/batches/batches.component';
import { BoomComponent } from './app/components/boom/boom.component';
import { ViewAssociatesComponent } from './app/components/associates/view-associates/view-associates.component';
import { MyBatchesComponent } from './app/components/batches/my-batches/my-batches.component';
import { AllBatchesComponent } from './app/components/batches/all-batches/all-batches.component';
import { EditBatchesComponent } from './app/components/batches/edit-batches/edit-batches.component';

export const appRoutes: Routes = [
    // routes go here.
    {
        path: 'home',
        component: HomeComponent
    },

    {
        path: 'associates',
        component: AssociatesComponent,
        children: [
            {
                path: 'viewAssociates',
                component: ViewAssociatesComponent
            }
        ],
    },

    {
        path: 'batches',
        component: BatchesComponent,
        children: [
            {
                path: 'myBatches',
                component: MyBatchesComponent
            },
            {
                path: 'allBatches',
                component: AllBatchesComponent
            },
            {
                path: 'editBatches',
                component: EditBatchesComponent
            },
        ]
    },

    {
        path: 'boom',
        component: BoomComponent
    },

    {
        path: '**',
        pathMatch: 'full',
        redirectTo: '/'
    }
];
