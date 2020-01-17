import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { FormService } from 'src/app/services/formService';
import { json } from 'd3';
import { NzNotificationService } from 'ng-zorro-antd';
import { CrudService } from '../../../shared/service/crud.service';

@Component({
  selector: 'dynamic-form-builder',
  templateUrl: './dynamic-form-builder.component.html',
})
export class DynamicFormBuilderComponent implements OnInit {
  // @Output() onSubmit = new EventEmitter();
  // @Input() fields: any[] = [];
  // form: FormGroup;
  public form: FormGroup;
  public myForm: FormGroup;
  unsubcribe: any
  compareFn = (o1: any, o2: any) => (o1 && o2 ? o1.value === o2.value : o1 === o2);

  public formData: any;
  public fields: any[];
  startDate: any;
  endDate: any;
  inputValue: string;
  listOfForms: any[] = [];
  options = [];
  constructor(  private formService: FormService, private service:CrudService,
     private fb: FormBuilder, private notification: NzNotificationService) {
    this.myForm = new FormGroup({
      id: new FormControl()
    });
    this.form = new FormGroup({
      fields: new FormControl(JSON.stringify(this.fields)),
    })
    this.unsubcribe = this.form.valueChanges.subscribe((update) => {
      this.fields = JSON.parse(update.fields);
    });
  }
  ngOnInit() {

    this.getAllFormsList();
    this.getForm(localStorage.getItem('FORM_NAME'));
    //  barTwo = () => { console.log(this.fields); }
  }


  onSubmit(value) {
    this.formService.submitAnswers(value).subscribe(
      result => {
        this.createNotification('success');
        console.log(result);
      },
      error => {
        this.createNotification('error');
        console.log(error.error)
      }
    )

  }

  onInput(value: string): void {
      console.log(this.options)
      console.log(this.listOfForms)
      this.listOfForms = this.options.filter(option => option.formName.toLowerCase().indexOf(value.toLowerCase()) === 0);
  }

getAllFormsList() {
  this.formService.getAllForms().subscribe(
    result => {
      this.options = result;
      this.listOfForms = result;
      // this.createNotification('success');
    },
      error => {
        this.createNotification('error');
        console.log(error.error)
      }
  );
}

  createNotification(type: string): void {
    this.notification.create(
      type,
      'Saved',
      'Form saved successfully.'
    );
  }

  getForm(item) {
    this.formService.getForm(item).subscribe(
      result => {
        if (result!== null && result !== undefined) {
        this.formData = result
        this.fields = result.questions;
        let fieldsCtrls = {};
        let id = new FormControl();
        this.fields.push(id);
        for (let f of this.fields) {
          if (f.value!= null) {
          if (f.type != 'checkbox') {
            fieldsCtrls[f.name] = new FormControl(f.value || '', Validators.required)
          } else {
            let opts = {};
            for (let opt of f.options) {
              opts[opt.key] = new FormControl(opt.value);
            }
            fieldsCtrls[f.name] = new FormGroup(opts);
          }
        }
        }
        this.form = new FormGroup(fieldsCtrls);
        console.log(this.fields.pop())
        this.myForm.addControl('answers', this.form);
      }
    // this.router.navigate(['get-form'])
  },
      error => {
        console.log(error.error);
      }
    );
  }

  getFields() {
    return this.fields;
  }

  ngDistroy() {
    this.unsubcribe();
  }
}
