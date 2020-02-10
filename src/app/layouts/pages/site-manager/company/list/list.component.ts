import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/shared/service/company.service';
import { BaseNameType } from 'src/app/shared/enum/base-name-type.enum';
import { NzNotificationService } from 'ng-zorro-antd';
import { Router } from '@angular/router';
import { Global } from 'src/app/global';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  list: any[];
  displayCompanies = [];
  sortName = null;
  sortValue = null;
  listOfSearchName = [];
  searchAddress: string;
  loading = true;
  isModalVisible = false;
  deleteId: string;
  constructor(private service: CompanyService, private router: Router,
              private notification: NzNotificationService, public global: Global) { }
  ngOnInit() {
    this.getCompanies();
  }
  sort(sort: { key: string; value: string }): void {
    this.sortName = sort.key;
    this.sortValue = sort.value;
    this.search();
  }

  filter(listOfSearchName: string[], searchAddress: string): void {
    this.listOfSearchName = listOfSearchName;
    this.searchAddress = searchAddress;
    this.search();
  }

  search(): void {
    // /** filter data **/
    const filterFunc = item =>
      (this.searchAddress ? item.address.indexOf(this.searchAddress) !== -1 : true) &&
      (this.listOfSearchName.length
        ? this.listOfSearchName.some(name => item.name.indexOf(name) !== -1)
        : true);
    const data = this.list.filter(item => filterFunc(item));
    /** sort data **/
    if (this.sortName && this.sortValue) {
      this.displayCompanies = data.sort((a, b) =>
        this.sortValue === 'ascend'
          ? a[this.sortName] > b[this.sortName]
            ? 1
            : -1
          : b[this.sortName] > a[this.sortName]
          ? 1
          : -1,
      );
    } else {
      this.displayCompanies = data;
    }
  }
  getCompanies() {
    this.service.getAll().subscribe(
      result => {
        console.log(result);
        this.list = result;
        this.displayCompanies = [...this.list];
        this.loading = false;
      },
      error => {
        this.loading = false;
        this.notification.error('Error Encountered', error.message);
      },
    );
  }

  edit(id: string) {
    localStorage.setItem('IMAGE_ID', id);
    this.router.navigateByUrl('/site-manager/company/edit/' + id);
  }
  delete(value) {
    this.isModalVisible = true;
    this.deleteId = value;
   }
   closeModal() {
    this.isModalVisible = false;
  }
  deleteItem() {
    this.service.delete('/company/delete/' + this.deleteId).subscribe(
      result => {
       this.list = this.list.filter( item => item.id !== this.deleteId);
       this.list = [...this.list];
       this.displayCompanies = this.displayCompanies.filter( item => item.id !== this.deleteId);
       this.displayCompanies = [...this.displayCompanies];
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

}
