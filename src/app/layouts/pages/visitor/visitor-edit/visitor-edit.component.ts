import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UploadChangeParam, NzMessageService, NzNotificationService } from 'ng-zorro-antd';
import { CrudService } from 'src/app/shared/service/crud.service';
import { Router } from '@angular/router';
import { BaseNameService } from 'src/app/shared/service/basename.service';
import { BaseNameType } from 'src/app/shared/enum/base-name-type.enum';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-visitor-edit',
  templateUrl: './visitor-edit.component.html',
  styleUrls: ['./visitor-edit.component.scss']
})
export class VisitorEditComponent implements OnInit {

  form: FormGroup;
  isSaveLoading: boolean;
  duplicate: boolean;
  categoryList: any[];
  compareFn: ((f1: any, f2: any) => boolean) | null = this.compareByValue;



  constructor(private fb: FormBuilder, private msg: NzMessageService , private baseNameService: BaseNameService,
    private service: CrudService, private notification: NzNotificationService, private router: Router,
    public authService: AuthService) {

    }

  ngOnInit() {
    this.createForm();
    this.getCategories();
    let  userInfo = this.authService.user;
    this.populateForm(userInfo)
  }

  getCategories() {
    const baseType = BaseNameType;
    this.baseNameService.getAll(baseType[BaseNameType.CATEGORY]).subscribe(
      result => {
        console.log(result.list)
        this.categoryList = result.list;
      },
      error => {
        console.log(error.error);
   }
     ); }


  createForm() {
    this.form = this.fb.group({
      id: [null],
      version: [null],
      createdById: [null],
      dateCreated: [null],
      uuid: [null],
      firstName: [null, [Validators.required]],
      middleName: [null],
      lastName: [null, [Validators.required]],
      userName: [null, [Validators.email, Validators.required]],
      mobilePhone: [null],
      officePhone: [null],
      stateProvince: [null],
      jobCategory: [null],
      qualification: [null],
      gender: [null],
      userType: ['VISITOR'],
      city: [null],
      street: [null],
      country: [null],
      postalCode: [null],
      password: [null, [Validators.required]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]],
      // userRoles: [[], [Validators.required]],
    });
  }
  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() => this.form.controls.checkPassword.updateValueAndValidity());
  }
  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.form.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  }
  validateForm() {
    // tslint:disable-next-line: forin
    for (const i in this.form.controls) {
      this.form.controls[i].markAsDirty();
      this.form.controls[i].updateValueAndValidity();
    }
  }

  // submit(formData) {
  //   console.log(formData)
  // }

  submit(formdata) {
    this.isSaveLoading = true;
    // this.validateForm();

    if ( this.form.valid ) {
      this.service.save(formdata, '/visitor/update').subscribe(
        result => {
          console.log(result)
          if (!result.duplicate) {
            this.notification.success(
              'Notification',
              result.message,
            );
            // this.router.navigateByUrl('/visitor');
      } else {
        this.duplicate = true;
        this.notification.error(
          'Duplicate Name',
          'User already exist!',
        );
      }
          this.isSaveLoading = false;
          // this.populateForm(result);
        },
        error => {
          this.isSaveLoading = false;
          this.notification.error(
            'Error Encountered',
             error.message,
          );
        }
      );
    }
  }
  populateForm(data) {
    this.form.get('id').setValue(data.id);
    this.form.get('version').setValue(data.version);
    this.form.get('createdById').setValue(data.createdById);
    this.form.get('dateCreated').setValue(data.dateCreated);
    this.form.get('uuid').setValue(data.uuid);
    this.form.get('firstName').setValue(data.firstName);
    this.form.get('middleName').setValue(data.middleName);
    this.form.get('lastName').setValue(data.lastName);
    this.form.get('userName').setValue(data.userName);
    this.form.get('officePhone').setValue(data.officePhone);
    this.form.get('mobilePhone').setValue(data.mobilePhone);
    this.form.get('gender').setValue(data.gender);
    this.form.get('stateProvince').setValue(data.stateProvince);
    this.form.get('city').setValue(data.city);
    this.form.get('street').setValue(data.street);
    this.form.get('country').setValue(data.country);
    this.form.get('postalCode').setValue(data.postalCode);
    this.form.get('jobCategory').setValue(data.jobCategory);
    this.form.get('qualification').setValue(data.qualification);
    // this.form.get('branch').setValue(data.branch);
    this.form.get('password').setValue(data.password);
    this.form.get('checkPassword').setValue(data.password);
  }

  handleChange({ file, fileList }: UploadChangeParam): void {
    const status = file.status;
    if (status !== 'uploading') {
      console.log(file, fileList);
    }
    if (status === 'done') {
      this.msg.success(`${file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      this.msg.error(`${file.name} file upload failed.`);
    }
  }
  compareByValue(f1: any, f2: any) {
    return f1 && f2 && f1.id === f2.id;
  }
  cancel() {

  }

}
