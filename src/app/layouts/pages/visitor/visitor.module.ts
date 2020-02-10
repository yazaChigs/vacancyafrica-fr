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
@NgModule({
  imports: [VisitorRoutingModule,  FormsModule, ReactiveFormsModule, SharedModule, CleanUIModule,
    CommonModule,  NgZorroAntdModule.forRoot(),],
  declarations: [ VisitorLoginComponent, VisitorSigninComponent, VisitorEditComponent ],
  exports: [VisitorLoginComponent, VisitorSigninComponent, VisitorEditComponent ],
  entryComponents: [VisitorLoginComponent, VisitorSigninComponent],

})
export class VisitorModule {}
