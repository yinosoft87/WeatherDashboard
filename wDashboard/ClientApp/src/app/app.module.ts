import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgSemanticModule } from 'ng-semantic';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';

import { AppComponent } from './app.component';
import { WDashboardComponent } from './w-dashboard/w-dashboard.component';
import { WDashboardService } from './w-dashboard/w-dashboard.service';

@NgModule({
  declarations: [
    AppComponent,
    WDashboardComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    BsDropdownModule,
    TooltipModule,
    ModalModule,
    NgSemanticModule,
    RouterModule.forRoot([
      { path: '', component: WDashboardComponent, pathMatch: 'full' },
      { path: 'city/:name', component: WDashboardComponent },
    ])
  ],
  providers: [WDashboardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
export class AppBootstrapModule { }
