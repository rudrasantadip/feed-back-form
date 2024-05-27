import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonalComponent } from './components/personal/personal.component';
import { VerifyComponent } from './components/verify/verify.component';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { Feedback2Component } from './components/feedback2/feedback2.component';
import { personalGuard } from './guards/personal.guard';
import { verifyGuard } from './guards/verify.guard';

const routes: Routes = [
  {path:'personal',component:PersonalComponent},
  {path:'verify',component:VerifyComponent,canActivate:[personalGuard]},
  {path:'feedback',component:FeedbackComponent,canActivate:[verifyGuard]},
  {path:'feedback2',component:Feedback2Component,canActivate:[verifyGuard]},
  {path:'',redirectTo:'personal',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
