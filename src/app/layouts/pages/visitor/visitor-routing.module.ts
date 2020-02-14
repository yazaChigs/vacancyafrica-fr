import { VisitorLoginComponent } from './visitor-login/visitor-login.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { VisitorSigninComponent } from './visitor-signin/visitor-signin.component';
import { VisitorEditComponent } from './visitor-edit/visitor-edit.component';
import { VisitorProfileComponent } from './visitor-profile/visitor-profile.component';
const routes: Routes = [
  {
    path: 'login',
    component: VisitorLoginComponent,
    data: { title: 'Login' },
  },
  {
    path: 'register',
    component: VisitorSigninComponent,
    data: { title: 'Register' },
  },
  {
    path: 'profile/:id',
    component: VisitorProfileComponent,
    data: { title: 'Register' },
  },
  {
    path: 'edit',
    component: VisitorEditComponent,
    data: { title: 'edit info' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VisitorRoutingModule {}
