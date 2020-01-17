import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CleanUIModule } from 'src/app/components/CleanUIComponents/cleanui.module';
import { UsersRoutingModule } from './users-routing.module';
import { UserComponent } from './user/user.component';
import { UserListComponent } from './user-list/user-list.component';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from 'ng-zorro-antd';
@NgModule({
  imports: [UsersRoutingModule, FormsModule, ReactiveFormsModule,CommonModule,
    NgZorroAntdModule.forRoot(),
     SharedModule, CleanUIModule],
  declarations: [UserComponent, UserListComponent],
})
export class UsersModule {}
