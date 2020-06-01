
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbPaginationModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppbodyComponent } from './appbody/appbody.component';
import { AppbreadcrumComponent } from './shared/appbreadcrum/appbreadcrum.component';
import { AppheaderComponent } from './shared/appheader/appheader.component';


import { SideMenuComponent } from './shared/side-menu/side-menu.component';
import { MobileMenuComponent } from './shared/mobile-menu/mobile-menu.component';


import { StorageService } from './services/StorageService/storage.service';
import { ApiService } from './services/apiService/api.service';
import { ApplicantService } from './services/applicantService/applicant-service.service';
import { MessageService } from './services/messageService/message.service';
import { ExcelService } from './services/excel-service/excel.service';

import { ApplicantsComponent } from './applicants/applicants.component';
import { AlertComponent } from './shared/alert/alert.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';

@NgModule({
  declarations: [
    AppComponent,
    AppbodyComponent,
    AppbreadcrumComponent,
    AppheaderComponent,
    SideMenuComponent,
    MobileMenuComponent,
    ApplicantsComponent,
    AlertComponent,
    ConfirmationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgxUiLoaderModule,
    NgbPaginationModule,
    NgbAlertModule
  ],
  providers: [
    StorageService,
    ApiService,
    ApplicantService,
    MessageService,
    ExcelService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
