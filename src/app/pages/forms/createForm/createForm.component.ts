import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators, FormControl } from '@angular/forms';
import { FormService } from 'src/app/services/formService';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzNotificationService } from 'ng-zorro-antd';

@Component({
  selector: 'app-createForm',
  templateUrl: './createForm.component.html',
  styleUrls: ['./createForm.component.scss']
})
export class CreateFormComponent implements OnInit {
  public form: FormGroup;
  public formHeader: FormGroup;
  public contactList: FormArray;
  public anwersList: FormArray;
  list: any[];
  listA: any[];
  questionType = ['text', 'checkbox', 'select', 'number', 'radio', 'yesno'];

  // returns all form groups under contacts
  get createdFormHeader() {
    return this.form.get('formDetails') as FormGroup;
  }
  get contactFormGroup() {
    return this.form.get('questions') as FormArray;
  }
  get answersFormGroup() {
    return this.form.get('questions.options') as FormArray;
  }

  constructor(private fb: FormBuilder, private formService: FormService, private notification: NzNotificationService) {}

  ngOnInit() {
    this.form = this.fb.group({
      // id: [null, Validators.compose([Validators.required])],
      // organization: [null],
      // formHeader: this.fb.group({
        id: new FormControl(),
        formName: new FormControl('', Validators.required),
        companyName: new FormControl('', Validators.required),
        jobName: new FormControl('', Validators.required),
        startDate: new FormControl(),
        endDate: new FormControl(),
      // }),
      questions: this.fb.array([this.createContact()])
    });

    // set contactlist to this field
    this.contactList = this.form.get('questions') as FormArray;
    this.anwersList = this.form.get('options') as FormArray;
  }

  // contact formgroup
  createContact(): FormGroup {
    return this.fb.group({
      type: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      label: new FormControl('', Validators.required),
      value: new FormControl(''),
      required: new FormControl(),
      // weight: new FormControl(),
      options: this.fb.array([this.createAnswer()])
    });
  }

  createAnswer(): FormGroup {
    return this.fb.group({
      key: new FormControl(),
      label: new FormControl(),
      weight: new FormControl(),
    });
  }
  createFormHeader(): FormGroup {
    return this.fb.group({
      formName: new FormControl(),
      companyName: new FormControl(),
      jobName: new FormControl(),
      startDate: new FormControl(),
      endDate: new FormControl(),
    });
  }

  fieldChanged(x) {
    const users = this.form.get['questions'] as FormArray;
    // users.controls.forEach(pair =>
    //   console.log(pair)
    //    );
    console.log(x);
  }
  // add a contact form group
  addContact() {
    this.contactList.push(this.createContact());
    this.list = this.form.get('questions').value;
  }
  addAnswer(index) {
    // this.anwersList.push(this.createAnswer());
    // this.listA = this.form.get('answers').value;
    const fg = this.fb.group({
      label: new FormControl(),
      key: new FormControl(),
      weight: new FormControl(),
  });
    (((this.form.controls.questions as FormArray)
      .controls[index] as FormGroup).controls.options as FormArray).push(fg);
  }

  // remove contact from group
  removeAnswer(ansIndex,index) {
    (((this.form.controls.questions as FormArray)
    .controls[ansIndex] as FormGroup).controls.options as FormArray).removeAt(index);
  }

  // triggered to change validation of value field type
  changedFieldType(index) {
    let validators = null;
    console.log(index);
    }

  // get the formgroup under contacts form array
  getContactsFormGroup(index): FormGroup {
    const formGroup = this.contactList.controls[index] as FormGroup;
    return formGroup;
  }

  // method triggered when form is submitted
  submit(formValue) {
    console.log(formValue);
    this.formService.submit(formValue).subscribe(
      result => {
        console.log(result);
        this.createNotification('success');
      },
      error => {
        console.log(error.error);
        this.createNotification('error');
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

  getForm() {
    this.formService.getForm('ELEAZAR').subscribe(
      result => {
        console.log(result);
      },
      error => {
        console.log(error.error);
      }
    );
  }

  checkDuplicateInObject(propertyName, inputArray) {
    let seenDuplicate = false,
        testObject = {};

    inputArray.map(function(item) {
      var itemPropertyName = item[propertyName];
      if (itemPropertyName in testObject) {
        testObject[itemPropertyName].duplicate = true;
        item.duplicate = true;
        seenDuplicate = true;
      }
      else {
        testObject[itemPropertyName] = item;
        delete item.duplicate;
      }
    });

    console.log(seenDuplicate);
    return seenDuplicate;
  }

  }
