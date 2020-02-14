
import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CleanUIModule } from 'src/app/components/CleanUIComponents/cleanui.module';
import { CompanyRoutingModule } from './company-routing.module';
import { ListComponent } from './list/list.component';
import { NewCompanyComponent } from './new-company/new-company.component';
import { LogoComponent } from './logo/logo.component';
import { SharedComponentModule } from 'src/app/components/shared/shared.component.module';
import { AngularCropperjsModule } from 'angular-cropperjs';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '@angular/cdk/layout';
@NgModule({
  imports: [CompanyRoutingModule, FormsModule,CommonModule, ReactiveFormsModule, SharedModule, CleanUIModule,
     SharedComponentModule, AngularCropperjsModule, NgZorroAntdModule.forRoot(),LayoutModule],
  declarations: [ListComponent, NewCompanyComponent, LogoComponent],
  exports:[ NewCompanyComponent]
})
export class CompanyModule {}
