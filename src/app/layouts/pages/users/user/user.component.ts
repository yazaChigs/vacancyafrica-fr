import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd';
import { BaseNameService } from 'src/app/shared/service/basename.service';
import { BaseNameType } from 'src/app/shared/enum/base-name-type.enum';
import { CrudService } from 'src/app/shared/service/crud.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  form: FormGroup;
  duplicate = false;
  isSaveLoading = false;
  id: string;
  roles = [];
  branches = [];
  loading = true;
  compareFn: ((f1: any, f2: any) => boolean) | null = this.compareByValue;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private activatedRouter: ActivatedRoute,
    private notification: NzNotificationService,
    private baseNameService: BaseNameService,
    private service: CrudService,
  ) {
    this.id = this.activatedRouter.snapshot.params.id;
  }

  ngOnInit() {
    this.createForm();
    this.getRoles();
    this.getBranches();
  }
  ngAfterViewInit() {
    if (this.id !== undefined && this.id !== null) {
      console.log(this.id)
      this.getUser();
   }
  }
  compareByValue(f1: any, f2: any) {
    return f1 && f2 && f1.id === f2.id;
  }
  onBack() {
    this.router.navigate(['/site-manager']);
  }
  createForm() {
    this.form = this.fb.group({
      id: [null],
      version: [null],
      createdById: [null],
      dateCreated: [null],
      uuid: [null],
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      userName: [null, [Validators.email, Validators.required]],
      mobilePhone: [null],
      officePhone: [null],
      stateProvince: [null],
      gender: [null],
      city: [null],
      street: [null],
      branch: [null],
      country: [null],
      postalCode: [null],
      password: [null, [Validators.required]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]],
      userRoles: [[], [Validators.required]],
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
  submitForm() {
    this.isSaveLoading = true;
    this.validateForm();

    if ( this.form.valid ) {
      this.service.save(this.form.value, '/user/save').subscribe(
        result => {
          if (!result.duplicate) {
            this.notification.success(
              'Notification',
              result.message,
            );
            this.router.navigateByUrl('/main/admin/users');
      } else {
        this.duplicate = true;
        this.notification.error(
          'Duplicate Name',
          'User already exist!',
        );
      }
          this.isSaveLoading = false;
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
  getRoles() {
    const baseType = BaseNameType;
    this.baseNameService.getAll(baseType[BaseNameType.ROLE]).subscribe(
      result => {
        this.roles = result.list;
        this.roles = this.roles.filter(r => r.name !== 'ROLE_GLOBAL');
        this.loading = false;
      },
      error => {
        this.loading = false;
        this.notification.error('Error Encountered', error.message);
      },
    );
  }
  edit(data: any) {
    this.form.get('id').setValue(data.id);
    this.form.get('version').setValue(data.version);
    this.form.get('createdById').setValue(data.createdById);
    this.form.get('dateCreated').setValue(data.dateCreated);
    this.form.get('uuid').setValue(data.uuid);
    this.form.get('firstName').setValue(data.firstName);
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
    this.form.get('userRoles').setValue(data.userRoles);
    this.form.get('branch').setValue(data.branch);
    this.form.get('password').setValue(data.password);
    this.form.get('checkPassword').setValue(data.password);

    // console.log(data.userRoles);
    // const roles = data.userRoles as Array<any>;
    // roles.forEach(
    //   role => {
    //     const items = this.form.get('userRoles') as FormArray;
    //     items.push(new FormControl(role));
    //   }
    // );
  }

  getBranches() {
    this.service.getAll('/branch/get-all').subscribe(
      result => {
          this.branches = result;
      },
      error => {
        this.notification.error(
          'Error Encountered',
           error.message,
        );
      }
    );
  }
  getUser() {
    this.service.getItem('/user/get-item/' + this.id).subscribe(
      result => {
          this.edit(result);
      },
      error => {
        this.notification.error(
          'Error Encountered',
           error.message,
        );
      }
    );
  }
  cancel() {

  }
}
