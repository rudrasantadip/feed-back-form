import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonalComponent } from './components/personal/personal.component';
import { VerifyComponent } from './components/verify/verify.component';
import { FeedbackComponent } from './components/feedback/feedback.component';

const routes: Routes = [
  {path:'personal',component:PersonalComponent},
  {path:'verify',component:VerifyComponent},
  {path:'feedback',component:FeedbackComponent},

  {path:'',redirectTo:'personal',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
