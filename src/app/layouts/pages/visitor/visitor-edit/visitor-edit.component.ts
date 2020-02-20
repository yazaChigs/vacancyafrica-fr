import { FormGroup, Validators, FormBuilder, FormControl, FormArray } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UploadChangeParam, NzMessageService, NzNotificationService, UploadFile } from 'ng-zorro-antd';
import { CrudService } from 'src/app/shared/service/crud.service';
import { Router } from '@angular/router';
import { BaseNameService } from 'src/app/shared/service/basename.service';
import { BaseNameType } from 'src/app/shared/enum/base-name-type.enum';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';
import { filter } from 'rxjs/operators';
import { Global } from 'src/app/global';
import { TokenStorage } from '../../../../auth/token.storage';

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
  uploading = false;
  fileList: UploadFile[] = [];
  compareFn: ((f1: any, f2: any) => boolean) | null = this.compareByValue;
  showUploadList = {
    showPreviewIcon: true,
    showRemoveIcon: true,
    hidePreviewIconInNonImage: true
  };
  switchValue = false;
  previewImage: string | undefined = '';
  previewVisible = false;
  referenceArr: FormArray;
  skillArr: FormArray;
  certtificateArr: FormArray;
  avalailableFiles: any[];




  constructor(private fb: FormBuilder, private msg: NzMessageService , private baseNameService: BaseNameService,
    private service: CrudService, private token: TokenStorage, private http: HttpClient,
    private notification: NzNotificationService, private router: Router,
    public authService: AuthService) {

    }

  ngOnInit() {
    this.createForm();
    this.getCategories();

    this.getUser(this.authService.user.id);
    this.populateForm(this.authService.user)
    this.getAvailableFiles();
  }

getUser(id) {
  this.service.getItem('/visitor/get-item/'+ id).subscribe(
    result => {
      this.populateForm(result)
      // this.token.saveUser(JSON.stringify(result))
    },
    error => {
      this.notification.error('error', 'couldnt get user iformation!')
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

     handlePreview = (file: UploadFile) => {
      this.previewImage = file.url || file.thumbUrl;
      this.previewVisible = true;
    };


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
      idNumber: [null],
      experience: [null],
      jobCategory: [null],
      aboutVisitor: [''],
      qualification: [null],
      gender: [null],
      dateOfBirth: [null],
      userType: ['VISITOR'],
      city: [null],
      street: [null],
      country: [null],
      filesPublic: [true],
      files: [null],
      postalCode: [null],
      password: [null, [Validators.required]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]],
      references: this.fb.array([this.createItem()]),
      skills: this.fb.array([this.createSkill()]),
      certificates: this.fb.array([this.createCertificate()]),
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
  createItem() {
    return this.fb.group({
      refName : [null],
      refPhone : [null],
      refEmail : [null],
      refAddress : [null],
    })
  }
  createSkill() {
    return this.fb.group({
      skill : [null],
    })
  }

  createCertificate() {
    return this.fb.group({
      certificate : [null],
    })
  }

  addItem() {
    this.referenceArr = this.form.get('references') as FormArray;
    this.referenceArr.push(this.createItem());
  }
  addSkill() {
    this.skillArr = this.form.get('skills') as FormArray;
    this.skillArr.push(this.createSkill());
    return this.skillArr
  }

  addCertificate() {
    this.certtificateArr = this.form.get('certificates') as FormArray;
    this.certtificateArr.push(this.createCertificate());
    // return this.certtificateArr
  }

  removePhone(index) {
    (this.form.get('references') as FormArray).removeAt(index);
  }
  removeSkill(index) {
    (this.form.get('skills') as FormArray).removeAt(index);
  }

  removeCertificates(index) {
    (this.form.get('certificates') as FormArray).removeAt(index);
  }

  // submit(formData) {
  //   console.log(formData)
  // }

  beforeUpload = (file: UploadFile): boolean => {
    this.fileList = this.fileList.concat(file);
    return false;
  };

  handleUpload(): void {
    this.uploading = true;
    // const formData = new FormData();
    // tslint:disable-next-line:no-any
    this.fileList.forEach((file: any) => {
      this.service.saveFiles(file, '/visitor/upload/' ,this.authService.user.id ).subscribe(
        result => {
          console.log(result);
          this.notification.info(
            'Notification',
             result.message,
          );
        },
        error => {
          this.notification.error(
            'Error Encountered',
             error.message,
          );
        },
        () => {
                this.uploading = false;
                // this.msg.error('upload failed.');
              }
      );
    });
  }

  getAvailableFiles() {
    this.service.getAll('/visitor/uploaded-files/' + this.authService.user.id).subscribe(
      result => {
        this.avalailableFiles = result;
      },
      error => {
        console.log(error.error)
      }
    );
  }

  // getFile(fileName) {
  //   return this.http.get( this.global.baseUrl + '/api/visitor/get-file/' + fileName + '/' +
  //   // this.authService.user.id, { responseType: ResponseContentType.Blob })
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
              'Profile updated',
            );
            this.getUser(this.authService.user.id)
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
    this.form.get('experience').setValue(data.experience);
    this.form.get('country').setValue(data.country);
    this.form.get('postalCode').setValue(data.postalCode);
    this.form.get('jobCategory').setValue(data.jobCategory);
    this.form.get('qualification').setValue(data.qualification);
    this.form.get('password').setValue(data.password);
    this.form.get('checkPassword').setValue(data.password);



       const refArr = this.form.get('references') as FormArray;
      refArr.clear();
      data.references.forEach(b => {
        refArr.removeAt(0)
        const fg = this.createItem();
        fg.reset(b);
        refArr.push(fg);
      });
      // this.addItem();

      const skiArr = this.form.get('skills') as FormArray;
      skiArr.clear();
      data.skills.forEach(b => {
        const fg = this.createSkill();
        fg.reset(b);
        skiArr.push(fg);
      });
      // this.addSkill();

      const certArr = this.form.get('certificates') as FormArray;
      certArr.clear();
      data.certificates.forEach(b => {
        const fg = this.createCertificate();
        fg.reset(b);
        certArr.push(fg);
      });
      // this.addCertificate();


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
