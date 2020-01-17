import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    data: { title: 'Site Manager' },
  },
  {
    path: 'company',
    loadChildren: './company/company.module#CompanyModule',
  },
  {
    path: 'access',
    loadChildren: './access/access.module#AccessModule',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SiteManagerRoutingModule {}
