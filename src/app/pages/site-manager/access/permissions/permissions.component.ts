import { Component, OnInit } from '@angular/core';
import { BaseNameType } from 'src/app/shared/enum/base-name-type.enum';

@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.scss']
})
export class PermissionsComponent implements OnInit {
  type = BaseNameType.PERMISSION;
  constructor() { }

  ngOnInit() {
  }

}
