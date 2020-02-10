import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { BaseNameType } from 'src/app/shared/enum/base-name-type.enum';
import { NzNotificationService } from 'ng-zorro-antd';
import { CompanyService } from 'src/app/shared/service/company.service';
import { BaseNameService } from 'src/app/shared/service/basename.service';
import { CrudService } from 'src/app/shared/service/crud.service';

@Component({
  selector: 'app-new-company',
  templateUrl: './new-company.component.html',
  styleUrls: ['./new-company.component.scss'],
})
export class NewCompanyComponent implements OnInit {






  modules: Array<any> = [];
  loading = true;
  form: FormGroup;
  isSaveLoading = false;
  duplicate = false;
  company: any;
  id: string;
  compareFn: ((f1: any, f2: any) => boolean) | null = this.compareByValue;
  // @Output() addUserDetails = new EventEmitter();
  // @Output() companyDetails = new EventEmitter();
  constructor( private baseNameService: BaseNameService, private fb: FormBuilder, private router: Router,
               private activatedRouter: ActivatedRoute,
               private notification: NzNotificationService, private companyService: CrudService) {
                this.id = this.activatedRouter.snapshot.params.id;
               }

  ngOnInit() {
    this.createForm();
    this.getModules();
  }
  ngAfterViewInit() {
    if (this.id !== undefined && this.id !== null) {
      this.getCompany();
   }
  }
  compareByValue(f1: any, f2: any) {
    return f1 && f2 && f1.id === f2.id;
  }
  getModules() {
    const baseType = BaseNameType;
    this.baseNameService.getAll(baseType[BaseNameType.MODULE]).subscribe(
      result => {
          this.modules = result.list;
          this.loading = false;
      },
      error => {
        this.loading = false;
        this.notification.error(
          'Error Encountered',
           error.message,
        );
      }
    );
  }

  createForm() {
    this.form = this.fb.group({
      id: [null],
      version: [null],
      createdById: [null],
      dateCreated: [null],
      uuid: [null],
      name: [null, [Validators.maxLength(45),
        Validators.minLength(2),
        Validators.required]],
      description: [null],
      mobilePhone: [null],
      officePhone: [null],
      stateProvince: [null],
      city: [null],
      street: [null],
      country: [null],
      postalCode: [null],
      fax: [null],
      email: [null],
      modules: [[], [Validators.required]],

    });
  }
  submitForm(): void {
    this.isSaveLoading = true;
    this.validateForm();

    if ( this.form.valid ) {
      this.companyService.save(this.form.value, '/company/save').subscribe(
        result => {
          if (!result.duplicate) {
            this.notification.success(
              'Notification',
              result.message,
            );
          //  this.router.navigateByUrl('/main/site-manager/company/list');
            localStorage.setItem('IMAGE_ID', result.item.id);
      } else {
        this.duplicate = true;
        this.notification.error(
          'Duplicate Name',
          'Company Name already exist!',
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
        },
        () => {
          window.location.reload();
        }
      );
    }
  }
  validateForm() {
    // tslint:disable-next-line: forin
    for (const i in this.form.controls) {
      this.form.controls[i].markAsDirty();
      this.form.controls[i].updateValueAndValidity();
    }
  }
  getCompany() {
    this.companyService.getItem('/company/get-item/' + this.id).subscribe(
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
  edit(data: any) {
    this.form.get('id').setValue(data.id);
    this.form.get('version').setValue(data.version);
    this.form.get('createdById').setValue(data.createdById);
    this.form.get('dateCreated').setValue(data.dateCreated);
    this.form.get('uuid').setValue(data.uuid);
    this.form.get('name').setValue(data.name);
    this.form.get('description').setValue(data.description);
    this.form.get('mobilePhone').setValue(data.mobilePhone);
    this.form.get('officePhone').setValue(data.officePhone);
    this.form.get('stateProvince').setValue(data.stateProvince);
    this.form.get('city').setValue(data.city);
    this.form.get('street').setValue(data.street);
    this.form.get('postalCode').setValue(data.postalCode);
    this.form.get('fax').setValue(data.fax);
    this.form.get('modules').setValue(data.modules);
    this.form.get('country').setValue(data.country);
  }

}
