import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RoutingModule } from './routing.module';
import { ChildrenOutletContexts } from '@angular/router';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, RoutingModule],
  providers: [ChildrenOutletContexts],
  bootstrap: [AppComponent]
})
export class AppModule {}
