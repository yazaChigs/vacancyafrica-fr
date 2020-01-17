import { Component, OnInit } from '@angular/core';
import { BaseNameService } from 'src/app/shared/service/basename.service';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd';
import { CrudService } from 'src/app/shared/service/crud.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  active = 0;
  inactive = 0;
  roles = 0;
  modules = 0;
  permissions = 0;
  constructor(private baseNameService: BaseNameService, private fb: FormBuilder, private router: Router,
              private activatedRouter: ActivatedRoute,
              private notification: NzNotificationService, private service: CrudService) { }

  ngOnInit() {
    this.getCount();
    this.getAccessCount();
  }

  getCount() {
    this.service.getItem('/company/count').subscribe(
      result => {
         this.active = Number(result.active);
         this.inactive = Number(result.inactive);
      },
      error => {
        this.notification.error(
          'Error Encountered',
           error.message,
        );
      }
    );
  }
  getAccessCount() {
    this.service.getItem('/site-manager/access').subscribe(
      result => {
         this.roles = Number(result.roles);
         this.modules = Number(result.modules);
         this.permissions = Number(result.permissions);
      },
      error => {
        this.notification.error(
          'Error Encountered',
           error.message,
        );
      }
    );
  }
}
