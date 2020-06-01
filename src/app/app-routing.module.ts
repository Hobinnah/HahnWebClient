import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppbodyComponent } from './appbody/appbody.component';
import { ApplicantsComponent } from './applicants/applicants.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';

const routes: Routes = [


  { path: '', component: AppbodyComponent,
    children: [
            { path: '', component: ApplicantsComponent },
            { path: 'applicants', component: ApplicantsComponent },
            { path: 'confirmation', component: ConfirmationComponent }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
