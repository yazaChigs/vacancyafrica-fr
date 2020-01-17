import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CleanUIModule } from 'src/app/components/CleanUIComponents/cleanui.module';
import { FormsRoutingModule } from './forms-routing.module';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { CreateFormComponent } from './createForm/createForm.component';
import { DynamicFormBuilderComponent } from './dynamic-form-builder/dynamic-form-builder.component';
import { CheckBoxComponent } from './dynamic-form-builder/atoms/checkbox/checkbox.component';
import { DropDownComponent } from './dynamic-form-builder/atoms/dropdown/dropdown.component';
import { RadioComponent } from './dynamic-form-builder/atoms/radio/radio.component';
import { TextBoxComponent } from './dynamic-form-builder/atoms/textbox/textbox.component';
import { FieldBuilderComponent } from './dynamic-form-builder/field-builder/field-builder.component';
@NgModule({
  imports: [FormsRoutingModule, FormsModule, ReactiveFormsModule,CommonModule,
    NgZorroAntdModule.forRoot(),

     SharedModule, CleanUIModule],
  declarations: [ CreateFormComponent, DynamicFormBuilderComponent,
    CheckBoxComponent, DropDownComponent,RadioComponent, TextBoxComponent, FieldBuilderComponent,],
})
export class FormzModule {}
