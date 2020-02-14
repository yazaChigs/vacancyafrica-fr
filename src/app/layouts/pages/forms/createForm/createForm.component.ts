import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators, FormControl } from '@angular/forms';
import { FormService } from 'src/app/services/formService';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzNotificationService, UploadFile, UploadXHRArgs } from 'ng-zorro-antd';
import { CrudService } from '../../../../shared/service/crud.service';
import { BaseNameService } from '../../../../shared/service/basename.service';
import { BaseNameType } from 'src/app/shared/enum/base-name-type.enum';
import { HttpRequest, HttpClient, HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-createForm',
  templateUrl: './createForm.component.html',
  styleUrls: ['./createForm.component.scss']
})
export class CreateFormComponent implements OnInit {
  public form: FormGroup;
  public adForm: FormGroup;
  public formHeader: FormGroup;
  public contactList: FormArray;
  public anwersList: FormArray;
  list: [];
  listA: [];
  questionType = ['text', 'checkbox', 'select', 'number', 'radio', 'yesno'];
  categoryList: any[]=[];
  compareFn: ((f1: any, f2: any) => boolean) | null = this.compareByValue;
  companyName = sessionStorage.getItem('C_NAME');
  listOfForms: any[];
  selectedValue :any;
  isSaveLoading = false
  loading = false

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

  constructor(private http: HttpClient, private fb: FormBuilder, private formService: FormService, private baseNameService: BaseNameService,
     private notification: NzNotificationService, private service: CrudService) {}

  ngOnInit() {

    this.form = this.fb.group({
        id: new FormControl(),
        overallWeight: new FormControl(0),
        formName: new FormControl('', Validators.required),
        companyName: new FormControl(this.companyName, Validators.required),
        category: new FormControl(null, Validators.required),
        jobName: new FormControl('', Validators.required),
        startDate: new FormControl(),
        endDate: new FormControl(),
      questions: this.fb.array([this.createContact()])
    });



    this.adForm = this.fb.group({
      id: new FormControl(),
      title: new FormControl('', Validators.required),
      job: new FormControl('', Validators.required),
      companyName: new FormControl(this.companyName, Validators.required),
      showCompanyName: new FormControl(),
      salary: new FormControl(),
      salaryPrefix: new FormControl('$'),
      showSalary: new FormControl(),
      showBenefits: new FormControl(),
      countryOfPlacement: new FormControl(),
      benefits: new FormControl(),
      category: new FormControl(null, Validators.required),
      formName : new FormControl(null, Validators.required),
      description: new FormControl('', Validators.required),
      startDate: new FormControl(),
      endDate: new FormControl(),
      files: new FormControl(),
  });

    // set contactlist to this field
    this.contactList = this.form.get('questions') as FormArray;
    this.anwersList = this.form.get('options') as FormArray;
    this.getCategories();
    this.getAllFormsList();
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
      category: new FormControl(),
      jobName: new FormControl(),
      startDate: new FormControl(),
      endDate: new FormControl(),
      firstName: new FormControl(),
      middleName: new FormControl(),
      lastName: new FormControl(),
      dateOfBirth: new FormControl(),
      mobile: new FormControl(),
      email: new FormControl(),
      address: new FormControl(),
    });
  }
  compareByValue(f1: any, f2: any) {
    return f1 && f2 && f1.id === f2.id;
  }

  setMediaUploadHeaders = (file: UploadFile) => {
    return {
      "Content-Type": "multipart/form-data",
      "Accept": "application/json",
    }
  };
  customUploadReq = (item: UploadXHRArgs) => {
    const formData = new FormData();
    formData.append('file', item.file as any); // tslint:disable-next-line:no-any
    ///formData.append('id', '1000');
    const req = new HttpRequest('POST', item.action, formData, {
      reportProgress : true,
      withCredentials: false
    });
    // Always return a `Subscription` object, nz-upload will automatically unsubscribe at the appropriate time
   return this.http.request(req).subscribe((event: HttpEvent<{}>) => {
      if (event.type === HttpEventType.UploadProgress) {
        if (event.total > 0) {
          (event as any).percent = event.loaded / event.total * 100; // tslint:disable-next-line:no-any
        }
        // To process the upload progress bar, you must specify the `percent` attribute to indicate progress.
        item.onProgress(event, item.file);
      } else if (event instanceof HttpResponse) { /* success */
        item.onSuccess(event.body, item.file, event);
      }
    },(err) => { /* error */
      item.onError(err, item.file);
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
    this.isSaveLoading= true
    console.log(formValue);
    this.service.save(formValue, '/create-form/create').subscribe(
    // this.formService.submit(formValue).subscribe(
      result => {
        console.log(result);
        this.createNotification('success');
      },
      error => {
        console.log(error.error);
        this.createNotification('error');
      },
      () => {
        this.isSaveLoading= false
      }
    );
  }

  submitAd(adFormValue) {
    console.log(adFormValue);
    this.service.save(adFormValue, '/advert/save').subscribe(
    // this.formService.submit(formValue).subscribe(
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
  getAllFormsList() {
    this.service.getAll('/create-form/get-all-by-company').subscribe(
      result => {
        console.log(result)
        // this.options = result;
        this.listOfForms = result;
        // this.createNotification('success');
      },
        error => {
          this.createNotification('error');
          console.log(error.error)
        }
    );
  }

  getCategories() {
    const baseType = BaseNameType;
    this.baseNameService.getAll(baseType[BaseNameType.CATEGORY]).subscribe(
      result => {
        this.categoryList = result.list;
      },
      error => {
        console.log(error.error);
   }
     ); }

  createNotification(type: string): void {
    this.notification.create(
      type,
      'Saved',
      'Form saved successfully.'
    );
  }

  getForm(event) {
    console.log(this.selectedValue);
    if (this.selectedValue !== null && this.selectedValue !== undefined) {
    this.service.getItem('/create-form/get/' + this.selectedValue).subscribe(
      result => {
        this.adForm.controls['job'].setValue(result.jobName);
        this.adForm.controls['category'].setValue( result.category);
        this.adForm.controls['startDate'].setValue(result.startDate);
        this.adForm.controls['endDate'].setValue(result.endDate);
      },
      error => {
        console.log(error.error);
      }
    );
    }
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
