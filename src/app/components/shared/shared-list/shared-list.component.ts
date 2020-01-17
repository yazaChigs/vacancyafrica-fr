import { Component, OnInit, Input } from '@angular/core';
import { BaseNameType } from 'src/app/shared/enum/base-name-type.enum';
import { BaseNameModel } from 'src/app/shared/model/base.name.model';
import { NzModalService, NzNotificationService } from 'ng-zorro-antd';
import { BaseNameService } from 'src/app/shared/service/basename.service';
import { SharedModalComponent } from '../shared-modal/shared-modal.component';

@Component({
  selector: 'app-shared-list',
  templateUrl: './shared-list.component.html',
  styleUrls: ['./shared-list.component.scss']
})
export class SharedListComponent implements OnInit {

  @Input() type: BaseNameType;
  nameType = BaseNameType;
  // keys: any[];
  list?: Array<any> = [];
  formData: BaseNameModel;
  loading = true;
  isModalVisible = false;
  deleteId: string;
  constructor(private modalService: NzModalService, private baseNameService: BaseNameService,
              private notification: NzNotificationService) {
               // this.keys = Object.keys(this.nameType).filter(Number);
              }

  ngOnInit() {
    this.getAll();
  }

  createComponentModal(): void {
    const modal = this.modalService.create({
      nzTitle: this.nameType[this.type],
      nzWidth: '40%',
      nzFooter: null,
      nzContent: SharedModalComponent,
      nzComponentParams: {
        data: this.formData,
        type: this.type
      }
    });
    modal.afterClose.subscribe(result => {
      if (result !== undefined) {
        this.list = this.list.filter( item => item.id !== result.data.id);
        this.list.push(result.data);
        this.list = [...this.list];
      }
      this.formData = undefined;
    });
  }

  getAll() {
    this.baseNameService.getAll(this.nameType[this.type]).subscribe(
      result => {
          this.list = result.list;
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
  edit(value) {
    this.formData = value;
    this.createComponentModal();
  }
  delete(value) {
   this.isModalVisible = true;
   this.deleteId = value;
  }
  deleteItem() {
    this.baseNameService.delete(this.nameType[this.type], this.deleteId).subscribe(
     result => {
      this.list = this.list.filter( item => item.id !== this.deleteId);
      this.list = [...this.list];
      this.notification.info(
        'Delete Notification!',
         result.message,
      );
      this.closeModal();
     },
     error => {
      this.notification.error(
        'Delete Failed!',
         error,
      );
     }
   );
  }
  closeModal() {
    this.isModalVisible = false;
  }


}
