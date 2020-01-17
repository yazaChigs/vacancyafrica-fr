import { ListComponent } from './list/list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewCompanyComponent } from './new-company/new-company.component';

const routes: Routes = [
  {
    path: '',
    component: ListComponent,
    data: { title: 'Companies' },
  },
  {
    path: 'new',
    component: NewCompanyComponent,
    data: { title: 'New Company' },
  },
  {
    path: 'edit/:id',
    component: NewCompanyComponent,
    data: { title: 'Edit Company' }
  },
  {
    path: 'list',
    component: ListComponent,
    data: { title: 'Companies' }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompanyRoutingModule {}
