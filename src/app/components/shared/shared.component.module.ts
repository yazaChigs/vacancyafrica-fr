import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModalComponent } from './shared-modal/shared-modal.component';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { BaseFormComponent } from './base-form/base-form.component';
import { SharedListComponent } from './shared-list/shared-list.component';
import { NgxPermissionsModule } from 'ngx-permissions';
import { TwoDigitDecimaNumberDirective } from 'src/app/layouts/directives/round-to-decimal.directive';

@NgModule({
  imports: [FormsModule, ReactiveFormsModule, CommonModule, NgZorroAntdModule, NgxPermissionsModule],
  exports: [SharedModalComponent, BaseFormComponent, SharedListComponent, NgxPermissionsModule, TwoDigitDecimaNumberDirective],
  entryComponents: [SharedModalComponent],
  declarations: [SharedModalComponent, BaseFormComponent, SharedListComponent, TwoDigitDecimaNumberDirective],
})
export class SharedComponentModule {}
