import { Component, OnInit } from '@angular/core';
import { BaseNameType } from 'src/app/shared/enum/base-name-type.enum';
import { SharedModalComponent } from 'src/app/components/shared/shared-modal/shared-modal.component';
import { NzModalService, NzNotificationService } from 'ng-zorro-antd';
import { BaseNameModel } from 'src/app/shared/model/base.name.model';
import { BaseNameService } from 'src/app/shared/service/basename.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {

  type = BaseNameType.ROLE;

  constructor() { }

  ngOnInit() {
  }

}
