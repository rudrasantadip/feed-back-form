import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonalComponent } from './components/personal/personal.component';
import { VerifyComponent } from './components/verify/verify.component';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { Feedback2Component } from './components/feedback2/feedback2.component';

const routes: Routes = [
  {path:'personal',component:PersonalComponent},
  {path:'verify',component:VerifyComponent},
  {path:'feedback',component:FeedbackComponent},
  {path:'feedback2',component:Feedback2Component},

  {path:'',redirectTo:'personal',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
