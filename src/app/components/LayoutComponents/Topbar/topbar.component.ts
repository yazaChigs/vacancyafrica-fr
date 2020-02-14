import { BaseNameService } from './../../../shared/service/basename.service';
import { Component, OnInit } from '@angular/core'
import { BaseNameType } from 'src/app/shared/enum/base-name-type.enum';
import { CrudService } from '../../../shared/service/crud.service';

@Component({
  selector: 'cui-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent implements OnInit {
  categoryList: [];
  listOfForms: any[];

  constructor(private baseNameService: BaseNameService, private service: CrudService) {}

  ngOnInit(): void {
    this.getCategories()
    this.getAllFormsList()
  }

  getAllFormsList() {
    this.service.getAll('/create-form/get-all').subscribe(
      result => {
        this.listOfForms = result;
        // this.createNotification('success');
      },
        error => {
          // this.createNotification('error');
          console.log(error.error)
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
}
