import { Component, OnInit } from '@angular/core';
import { BaseNameType } from 'src/app/shared/enum/base-name-type.enum';

@Component({
  selector: 'app-modules',
  templateUrl: './modules.component.html',
  styleUrls: ['./modules.component.scss']
})
export class ModulesComponent implements OnInit {
  type = BaseNameType.MODULE;
  constructor() { }

  ngOnInit() {
  }

}
