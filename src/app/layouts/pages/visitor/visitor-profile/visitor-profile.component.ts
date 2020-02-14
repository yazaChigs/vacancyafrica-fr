import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CrudService } from '../../../../shared/service/crud.service';
import { NzNotificationService } from 'ng-zorro-antd';

@Component({
  selector: 'app-visitor-profile',
  templateUrl: './visitor-profile.component.html',
  styleUrls: ['./visitor-profile.component.scss']
})
export class VisitorProfileComponent implements OnInit {

  id: string;
  data :any;

  constructor(
    private activatedRouter: ActivatedRoute, private service: CrudService, private notification:NzNotificationService,

  ) {
    this.id = this.activatedRouter.snapshot.params.id;
   }

  ngOnInit() {

  }

  ngAfterViewInit() {
    if (this.id !== undefined && this.id !== null) {
      this.getVisitor();
   }
  }

  getVisitor() {
    this.service.getItem('/visitor/get-item/' + this.id).subscribe(
      result => {
          console.log(result);
          this.data = result
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
