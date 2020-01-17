import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-base-form',
  templateUrl: './base-form.component.html'
  // styleUrls: ['./base-form.component.css']
})
export class BaseFormComponent implements OnInit {


  constructor() { }

  ngOnInit() {
  }
}
