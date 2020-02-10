import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DynamicFormBuilderComponent } from '../../dynamic-form-builder.component';

@Component({
    selector: 'app-radio',
    templateUrl: './radio.component.html',
})
export class RadioComponent implements OnInit{
    @Input() field:any = {};
    @Input() form:FormGroup;

    constructor(private toCreateForm: DynamicFormBuilderComponent) {}

    ngOnInit() {
    }

    radioChange(event,value) {
      this.toCreateForm.addWeightingFromRadio(value.weight)
  }
}
