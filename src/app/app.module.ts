import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { appRoutes } from '../routes';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { AssociatesComponent } from './components/associates/associates.component';
import { BatchesComponent } from './components/batches/batches.component';
import { BoomComponent } from './components/boom/boom.component';
import { ViewAssociatesComponent } from './components/associates/view-associates/view-associates.component';
import { MyBatchesComponent } from './components/batches/my-batches/my-batches.component';
import { AllBatchesComponent } from './components/batches/all-batches/all-batches.component';
import { EditBatchesComponent } from './components/batches/edit-batches/edit-batches.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    AssociatesComponent,
    BatchesComponent,
    BoomComponent,
    ViewAssociatesComponent,
    MyBatchesComponent,
    AllBatchesComponent,
    EditBatchesComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
