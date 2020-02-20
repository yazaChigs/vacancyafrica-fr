import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core'
import { CrudService } from '../../../../shared/service/crud.service';
import { NzNotificationService } from 'ng-zorro-antd';
import { distanceInWords } from 'date-fns';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { PushNotificationService, PushNotificationOptions } from 'src/app/services/push-notification.service';

declare var require: any
const data: any = require('./data.json')

@Component({
  selector: 'app-dashboard-alpha',
  templateUrl: './alpha.component.html',
  styleUrls: ['./alpha.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class DashboardAlphaComponent implements OnInit {
  chartCardData = data.chartCardData
  chartCardGraphOptions: object
  paymentAccountsData = data.paymentAccountsData
  paymentCardsData = data.paymentCardsData
  paymentTransactionsData = data.paymentTransactionsData
  pricingItemData = data.pricingItemData
  referalsData = data.referalsData
  displayReferalsData = [...this.referalsData]
  sortNameReferals = null
  sortValueReferals = null
  allAdverts: any[];
  likes = 0;
  dislikes = 0;
  loading = true;
  time = distanceInWords(new Date(), new Date());
  randomColor = "#"+((1<<24)*Math.random()|0).toString(16);

  constructor( private notification: NzNotificationService,private service: CrudService, private datePipe: DatePipe,
     private router: Router, private _pushNotificationService: PushNotificationService) {

  }
  ngOnInit() {
    this.getAds();
  }

  myFunction() {
    const title = 'Hello';
    const options = new PushNotificationOptions();
    options.body = 'Native Push Notification';

    this._pushNotificationService.create(title, options).subscribe((notif) => {
      if (notif.event.type === 'show') {
        console.log('onshow');
        setTimeout(() => {
          notif.notification.close();
        }, 30000);
      }
      if (notif.event.type === 'click') {
        console.log('click');
        notif.notification.close();
      }
      if (notif.event.type === 'close') {
        console.log('close');
      }
    },
    (err) => {
         console.log(err);
    });
}

  sort(sort: { key: string; value: string }): void {
    this.sortNameReferals = sort.key
    this.sortValueReferals = sort.value
    this.search()
  }

  getRandomColor():string {
    var color = Math.floor(0x1000000 * Math.random()).toString(16);
    return '#' + ('000000' + color).slice(-6);
  }

  search(): void {
    if (this.sortNameReferals && this.sortValueReferals) {
      this.displayReferalsData = this.referalsData.sort((a, b) =>
        this.sortValueReferals === 'ascend'
          ? a[this.sortNameReferals] > b[this.sortNameReferals]
            ? 1
            : -1
          : b[this.sortNameReferals] > a[this.sortNameReferals]
          ? 1
          : -1,
      )
    } else {
      this.displayReferalsData = this.referalsData
    }
  }

  like(): void {
    this.likes = 1;
    this.dislikes = 0;
  }

  dislike(): void {
    this.likes = 0;
    this.dislikes = 1;
  }

  goToForm() {
    this.router.navigate(['/forms/view'])
  }

  getAds() {
    this.service.getAll('/advert/get-all').subscribe(
      result => {
        this.allAdverts = result;
        this.loading = false;
      },
      error => {
        console.log(error.error)
      }
    );
  }
}
