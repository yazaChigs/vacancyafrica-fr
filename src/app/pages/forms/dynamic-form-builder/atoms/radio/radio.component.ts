import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'radio',
    templateUrl: './radio.component.html',
})
export class RadioComponent {
    @Input() field:any = {};
    @Input() form:FormGroup;
}
