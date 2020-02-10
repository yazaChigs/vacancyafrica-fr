import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { DynamicFormBuilderComponent } from '../../dynamic-form-builder.component';

@Component({
    selector: 'app-checkbox',
    templateUrl: '../checkbox/checkbox.component.html'
})
export class CheckBoxComponent{

    @Input() field:any = {};
    @Input() form:FormGroup;
    get isValid() { return this.form.controls[this.field.name].valid; }
    get isDirty() { return this.form.controls[this.field.name].dirty; }

    constructor(private toCreateForm: DynamicFormBuilderComponent) {}
    toggleEditable(opt, event) {
      this.toCreateForm.addWeightingFromCheckbox(event.target.checked, opt)
 }
}
