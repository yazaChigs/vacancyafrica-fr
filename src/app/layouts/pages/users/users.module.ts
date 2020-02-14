import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CleanUIModule } from 'src/app/components/CleanUIComponents/cleanui.module';
import { UsersRoutingModule } from './users-routing.module';
import { UserComponent } from './user/user.component';
import { UserListComponent } from './user-list/user-list.component';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { LogoComponent } from '../site-manager/company/logo/logo.component';
import { AngularCropperjsModule } from 'angular-cropperjs';
import { LayoutModule } from '@angular/cdk/layout';
import { UserLogoComponent } from './user-logo/user-logo.component';
@NgModule({
  imports: [UsersRoutingModule, FormsModule, ReactiveFormsModule,CommonModule,
    NgZorroAntdModule.forRoot(), AngularCropperjsModule , LayoutModule,
     SharedModule, CleanUIModule],
  declarations: [UserComponent, UserListComponent, UserLogoComponent],
})
export class UsersModule {}
