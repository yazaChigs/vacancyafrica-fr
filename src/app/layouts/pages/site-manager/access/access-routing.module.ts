import { PermissionsComponent } from './permissions/permissions.component';
import { ModulesComponent } from './modules/modules.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RolesComponent } from './roles/roles.component';
import { JobCategoriesComponent } from './job-categories/job-categories.component';

const routes: Routes = [
  {
    path: 'modules',
    component: ModulesComponent,
    data: { title: 'Modules' },
  },
  {
    path: 'roles',
    component: RolesComponent,
    data: { title: 'Roles' },
  },
  {
    path: 'permissions',
    component: PermissionsComponent,
    data: { title: 'Permissions' },
  },
  {
    path: 'categories',
    component: JobCategoriesComponent,
    data: { title: 'Categories' },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccessRoutingModule {}
