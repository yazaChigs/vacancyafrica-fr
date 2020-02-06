import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { FormService } from 'src/app/services/formService';
import { json } from 'd3';
import { NzNotificationService } from 'ng-zorro-antd';
import { CrudService } from '../../../shared/service/crud.service';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { default as localeEn } from '@angular/common/locales/en';

@Component({
  selector: 'dynamic-form-builder',
  templateUrl: './dynamic-form-builder.component.html',
})
export class DynamicFormBuilderComponent implements OnInit {
  public form: FormGroup;
  public myForm: FormGroup;
  unsubcribe: any
  public formData: any = {};
  public fields: any[];
  startDate: any;
  endDate: any;
  inputValue: string;
  listOfForms: any[] = [];
  options = [];
  companyName = sessionStorage.getItem('C_NAME');
  sub: any;
  page: number;
   defaultWeight = 0;
   defaultWeightRadio = 0;
  compareFn = (o1: any, o2: any) => (o1 && o2 ? o1.value === o2.value : o1 === o2);
  constructor(  private formService: FormService, private service:CrudService,  private datePipe: DatePipe,
     private fb: FormBuilder, private notification: NzNotificationService,  private route: ActivatedRoute,
     private router: Router) {
    this.myForm = new FormGroup({
      id: new FormControl(),
      firstName: new FormControl('', Validators.required),
      middleName: new FormControl(),
      lastName: new FormControl('', Validators.required),
      dateOfBirth: new FormControl(),
      mobile: new FormControl(),
      email: new FormControl(),
      address: new FormControl(),
      formName: new FormControl(),
      companyName: new FormControl(this.companyName),
      category: new FormControl(),
      overallWeight: new FormControl(0),
      jobName: new FormControl(),
      startDate: new FormControl(),
      endDate: new FormControl(),
    });
    this.form = new FormGroup({
      fields: new FormControl(JSON.stringify(this.fields)),
    })
    this.unsubcribe = this.form.valueChanges.subscribe((update) => {
      this.fields = JSON.parse(update.fields);
    });
  }
  ngOnInit() {

    this.sub = this.route
      .queryParams
      .subscribe(params => {
        // Defaults to 0 if no query param provided.
        console.log(params);
        if(params.formName !== null) {
          this.getForm(params.formName);
        }
        this.page = +params['page'] || 0;
      });
    this.getAllFormsList();
    this.getForm(localStorage.getItem('FORM_NAME'));
    //  barTwo = () => { console.log(this.fields); }
  }


  onSubmit(value) {
    this.service.save(value,'/application/save').subscribe(
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
  this.service.getAll('/create-form/get-all').subscribe(
    result => {
      console.log(result)
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

addWeightingFromRadio(value) {
  let now = value
  let weigh = this.myForm.get('overallWeight').value - this.defaultWeightRadio
  this.myForm.get('overallWeight').setValue(weigh + value)
   this.defaultWeightRadio = value

}

addWeightingFromDropdown(value) {
  let now = value
  let weigh = this.myForm.get('overallWeight').value - this.defaultWeight
  this.myForm.get('overallWeight').setValue(weigh + value)
   this.defaultWeight = value

}

addWeightingFromCheckbox(opt, checked) {
  let weigh = this.myForm.get('overallWeight').value
  if ( checked ) {
    this.myForm.get('overallWeight').setValue(weigh + opt.weight)
      } else {
    this.myForm.get('overallWeight').setValue(weigh - opt.weight)
  }
}

  createNotification(type: string): void {
    this.notification.create(
      type,
      'Saved',
      'Form saved successfully.'
    );
  }

  getForm(item) {
    this.service.getItem('/create-form/get/' + item).subscribe(
      result => {
        if (result!== null && result !== undefined) {
        this.formData = result
        console.log(this.formData)
        this.fields = result.questions;
        this.myForm.controls['formName'].setValue(this.formData.formName);
        this.myForm.controls['category'].setValue(this.formData.category);
        this.myForm.controls['jobName'].setValue(this.formData.jobName);
        this.myForm.controls['startDate'].setValue(this.formData.startDate);
        this.myForm.controls['endDate'].setValue(this.formData.endDate);
        this.myForm.controls['overallWeight'].setValue(this.formData.overallWeight);

        let fieldsCtrls = {};
        let id = new FormControl();
        this.fields.push(id);
        for (let f of this.fields) {
          if (f.value != null) {
          if (f.type !== 'checkbox') {
            fieldsCtrls[f.name] = new FormControl(f.value || '')
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
        this.fields.pop()
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
