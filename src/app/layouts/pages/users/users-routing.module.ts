import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { UserComponent } from './user/user.component';
const routes: Routes = [
  {
    path: '',
    component: UserListComponent,
    data: { title: 'Users' },
  },
  {
    path: 'edit/:id',
    component: UserComponent,
    data: { title: 'Edit User' },
  },
  {
    path: 'new',
    component: UserComponent,
    data: { title: 'New User' },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
