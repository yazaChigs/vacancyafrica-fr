import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd';
import { BaseNameService } from 'src/app/shared/service/basename.service';
import { CrudService } from 'src/app/shared/service/crud.service';

@Component({
  selector: 'app-visitor-signin',
  templateUrl: './visitor-signin.component.html',
  styleUrls: ['./visitor-signin.component.scss']
})
export class VisitorSigninComponent implements OnInit {
  backgroundNumber = 1
  fullScreen = false
  // validateForm: FormGroup
  visitorForm: FormGroup;
  isSaveLoading: boolean;
  duplicate: boolean;

  constructor( private router: Router,
    private fb: FormBuilder,
    private activatedRouter: ActivatedRoute,
    private notification: NzNotificationService,
    private baseNameService: BaseNameService,
    private service: CrudService,) {}

  ngOnInit(): void {
    // this.validateForm = this.fb.group({})
    this.createForm();
  }

  changeBackground(): void {
    if (this.backgroundNumber === 5) {
      this.backgroundNumber = 1
    } else {
      this.backgroundNumber += 1
    }
  }
  validateForm() {
    // tslint:disable-next-line: forin
    for (const i in this.visitorForm.controls) {
      this.visitorForm.controls[i].markAsDirty();
      this.visitorForm.controls[i].updateValueAndValidity();
    }
  }

  submitForm(formdata) {
    this.isSaveLoading = true;
    this.validateForm();

    if ( this.visitorForm.valid ) {
      this.service.save(this.visitorForm.value, '/visitor/save').subscribe(
        result => {
          if (!result.duplicate) {
            this.notification.success(
              'Notification',
              result.message,
            );
            this.router.navigateByUrl('/visitor/edit');
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

  createForm() {
    this.visitorForm = this.fb.group({
      id: [null],
      version: [null],
      createdById: [null],
      dateCreated: [null],
      uuid: [null],
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      userName: [null, [Validators.email, Validators.required]],
      middleName: [''],
      officePhone: [''],
      mobilePhone: [''],
      gender: [''],
      stateProvince: [''],
      city: [''],
      street: [''],
      country: [''],
      postalCode: [''],
      jobCategory: [''],
      qualification: [''],
      password: [null, [Validators.required]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]],
      userRoles:  [],
    });
  }

  changeScreen(): void {
    this.fullScreen = !this.fullScreen
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.visitorForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  }
}
