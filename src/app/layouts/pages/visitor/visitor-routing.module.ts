import { VisitorLoginComponent } from './visitor-login/visitor-login.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { VisitorSigninComponent } from './visitor-signin/visitor-signin.component';
import { VisitorEditComponent } from './visitor-edit/visitor-edit.component';
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
    path: 'edit',
    component: VisitorEditComponent,
    data: { title: 'edit info' },
  },
  // {
  //   path: 'company',
  //   loadChildren: './company/company.module#CompanyModule',
  // },
  // {
  //   path: 'access',
  //   loadChildren: './access/access.module#AccessModule',
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VisitorRoutingModule {}
