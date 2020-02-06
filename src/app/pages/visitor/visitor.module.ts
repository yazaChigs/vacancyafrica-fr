import { VisitorSigninComponent } from './visitor-signin/visitor-signin.component';
import { VisitorLoginComponent } from './visitor-login/visitor-login.component';
import { NgModule } from '@angular/core';
import { SiteManagerRoutingModule } from '../site-manager/site-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared.module';
import { CleanUIModule } from 'src/app/components/CleanUIComponents/cleanui.module';
import { VisitorEditComponent } from './visitor-edit/visitor-edit.component';
@NgModule({
  imports: [SiteManagerRoutingModule, FormsModule, ReactiveFormsModule, SharedModule, CleanUIModule],
  declarations: [ VisitorEditComponent],
})
export class VisitorModule {}
