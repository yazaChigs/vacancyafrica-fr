import { Component, OnInit } from '@angular/core';
import { BaseNameType } from 'src/app/shared/enum/base-name-type.enum';

@Component({
  selector: 'app-job-categories',
  templateUrl: './job-categories.component.html',
  styleUrls: ['./job-categories.component.scss']
})
export class JobCategoriesComponent implements OnInit {

  type = BaseNameType.CATEGORY;
  constructor() { }

  ngOnInit() {
  }

}
