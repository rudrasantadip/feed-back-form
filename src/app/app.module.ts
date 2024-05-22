import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { BodyComponent } from './components/body/body.component';
import { PersonalComponent } from './components/personal/personal.component';
import { VerifyComponent } from './components/verify/verify.component';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { Feedback2Component } from './components/feedback2/feedback2.component';
import { FormsModule } from '@angular/forms';
import { NgxUiLoaderHttpModule, NgxUiLoaderModule, NgxUiLoaderRouterModule } from "ngx-ui-loader";
import { LoaderComponent } from './components/loader/loader.component';
import { HttpClientModule } from '@angular/common/http';
import { RecaptchaV3Module,RECAPTCHA_V3_SITE_KEY } from 'ng-recaptcha';
import {environment} from '../environments/environments';


@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HeaderComponent,
    BodyComponent,
    PersonalComponent,
    VerifyComponent,
    FeedbackComponent,
    Feedback2Component,
    LoaderComponent
 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgxUiLoaderModule,
    NgxUiLoaderRouterModule,
    NgxUiLoaderHttpModule.forRoot({showForeground:true}),
    HttpClientModule,
    RecaptchaV3Module
  ],
  providers: [
    {
      provide:RECAPTCHA_V3_SITE_KEY,
      useValue:environment.recaptcha.siteKey
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
