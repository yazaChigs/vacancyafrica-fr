import { Component, OnInit, Input } from '@angular/core';
import { NzModalRef, NzNotificationService } from 'ng-zorro-antd';
import { BaseNameType } from 'src/app/shared/enum/base-name-type.enum';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { BaseNameService } from 'src/app/shared/service/basename.service';

@Component({
  selector: 'app-shared-modal',
  templateUrl: './shared-modal.component.html',
  styleUrls: ['./shared-modal.component.scss']
})
export class SharedModalComponent implements OnInit {

  @Input() data: any;
  @Input() type: BaseNameType;
  form: FormGroup;
  isConfirmLoading = false;
  duplicate = false;

  constructor(private modal: NzModalRef, private fb: FormBuilder,
              private baseNameService: BaseNameService, private notification: NzNotificationService) {

  }

  ngOnInit() {
    this.createForm();
  }

  destroyModal(result: any): void {
    this.modal.destroy({ data: result });
  }

  submitForm(): void {
    this.isConfirmLoading = true;
    this.validateForm();
    if ( this.form.valid ) {
      this.baseNameService.save(this.form.value).subscribe(
        result => {
              if (!result.duplicate) {
                  this.isConfirmLoading = false;
                  this.notification.success(
                    'Notification',
                    result.message,
                  );
                  this.modal.destroy({data: result.item });
            } else {
              this.isConfirmLoading = false;
              this.duplicate = true;
              this.notification.error(
                'Duplicate Name',
                'Item already exist!',
              );
            }
        },
        error => {
          this.isConfirmLoading = false;
          this.notification.error(
            'Error Encountered',
             error.message,
          );
        }
      );
    }
  }

  createForm() {
   const baseType = BaseNameType;
   if (this.data !== undefined) {
   this.form = this.fb.group({
      id: [this.data.id],
      version: [this.data.version],
      createdById: [this.data.createdById],
      dateCreated: [this.data.dateCreated],
      type: [baseType[this.type]],
      uuid: [this.data.uuid],
      name: [this.data.name, [Validators.maxLength(45),
        Validators.minLength(2),
        Validators.required]],
      description: [this.data.description]
    });
  } else {
    this.form = this.fb.group({
      id: [null],
      version: [null],
      createdById: [null],
      dateCreated: [null],
      type: [baseType[this.type]],
      uuid: [null],
      name: [null, [Validators.maxLength(45),
        Validators.minLength(2),
        Validators.required]],
      description: [null]
    });
  }
  }

  validateForm() {
    // tslint:disable-next-line: forin
    for (const i in this.form.controls) {
      this.form.controls[i].markAsDirty();
      this.form.controls[i].updateValueAndValidity();
    }
  }

  handleCancel() {
    this.modal.destroy();
  }

}
