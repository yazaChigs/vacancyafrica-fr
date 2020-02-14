import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/shared/service/crud.service';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss']
})
export class ApplicationsComponent implements OnInit {

  list: any[];
  displayUsers = [];
  sortName = null;
  sortValue = null;
  listOfSearchName = [];
  searchAddress: string;
  loading = true;
  isModalVisible = false;
  deleteId: string;
  constructor(private service: CrudService, private router: Router,
              private notification: NzNotificationService) { }
  ngOnInit() {
    this.getCustomers();
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
      this.displayUsers = data.sort((a, b) =>
        this.sortValue === 'ascend'
          ? a[this.sortName] > b[this.sortName]
            ? 1
            : -1
          : b[this.sortName] > a[this.sortName]
          ? 1
          : -1,
      );
    } else {
      this.displayUsers = data;
    }
  }
  getCustomers() {
    this.service.getAll('/application/get-all').subscribe(
      result => {
        console.log(result)
        this.list = result;
        this.displayUsers = [...this.list];
        this.loading = false;
      },
      error => {
        this.loading = false;
        this.notification.error('Error Encountered', error.message);
      },
    );
  }

  edit(id: string) {
    this.router.navigateByUrl('/forms/edit/' + id);

  }

  viewApplicantProfile(id) {
    console.log(id)
    this.router.navigateByUrl('/visitor/profile/' + id);

  }



  delete(value) {
    this.isModalVisible = true;
    this.deleteId = value;
   }
   closeModal() {
    this.isModalVisible = false;
  }
  deleteItem() {
    this.service.delete('/application/delete/' + this.deleteId).subscribe(
      result => {
       this.list = this.list.filter( item => item.id !== this.deleteId);
       this.list = [...this.list];
       this.displayUsers = this.displayUsers.filter( item => item.id !== this.deleteId);
       this.displayUsers = [...this.displayUsers];
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
