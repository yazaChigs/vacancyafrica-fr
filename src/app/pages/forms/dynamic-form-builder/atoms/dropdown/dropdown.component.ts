import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DynamicFormBuilderComponent } from '../../dynamic-form-builder.component';

@Component({
    selector: 'app-dropdown',
    templateUrl: './dropdown.component.html'
})
export class DropDownComponent {

  selected: number = 1;
    @Input() field:any = {};
    @Input() form:FormGroup;
    constructor( private wale: DynamicFormBuilderComponent) {
    }

    assignCorporationToManage(selectedValue) {
      if (selectedValue != null && selectedValue != undefined) {
        this.wale.addWeightingFromDropdown(selectedValue.weight)
      }
    }
}
