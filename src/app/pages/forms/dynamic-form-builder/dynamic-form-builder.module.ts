import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

// components
import { DynamicFormBuilderComponent } from './dynamic-form-builder.component';
import { FieldBuilderComponent } from './field-builder/field-builder.component';
import { TextBoxComponent } from './atoms/textbox/textbox.component';
import { DropDownComponent } from './atoms/dropdown/dropdown.component';
import { CheckBoxComponent } from './atoms/checkbox/checkbox.component';
import { FileComponent } from './atoms/file';
import { RadioComponent } from './atoms/radio/radio.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { SharedModule } from 'src/app/shared.module';
import { CleanUIModule } from 'src/app/components/CleanUIComponents/cleanui.module';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule, FormsModule, ReactiveFormsModule,
    NgZorroAntdModule.forRoot(),

     SharedModule, CleanUIModule
  ],
  declarations: [
    DynamicFormBuilderComponent,
    // DynamicFormBuilderComponent,
    FieldBuilderComponent,
    TextBoxComponent,
    DropDownComponent,
    CheckBoxComponent,
    FileComponent,
    RadioComponent
  ],
  exports: [DynamicFormBuilderComponent],
  providers: []
})
export class DynamicFormBuilderModule { }
