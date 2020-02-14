import { CommonModule } from '@angular/common';
import { VisitorSigninComponent } from './visitor-signin/visitor-signin.component';
import { VisitorLoginComponent } from './visitor-login/visitor-login.component';
import { NgModule } from '@angular/core';
import { SiteManagerRoutingModule } from '../site-manager/site-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared.module';
import { CleanUIModule } from 'src/app/components/CleanUIComponents/cleanui.module';
import { VisitorEditComponent } from './visitor-edit/visitor-edit.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { VisitorRoutingModule } from './visitor-routing.module';
import { VisitorProfileComponent } from './visitor-profile/visitor-profile.component';
import { VisitorLogoComponent } from './visitor-logo/visitor-logo.component';
import { AngularCropperjsModule } from 'angular-cropperjs';
@NgModule({
  imports: [VisitorRoutingModule,  FormsModule, ReactiveFormsModule, SharedModule, CleanUIModule,
    CommonModule, AngularCropperjsModule,  NgZorroAntdModule.forRoot(), ],
  declarations: [ VisitorLoginComponent, VisitorSigninComponent, VisitorEditComponent, VisitorProfileComponent, VisitorLogoComponent ],
  exports: [VisitorLoginComponent, VisitorSigninComponent, VisitorEditComponent, VisitorProfileComponent, VisitorProfileComponent],
  entryComponents: [VisitorLoginComponent, VisitorSigninComponent],

})
export class VisitorModule {}
