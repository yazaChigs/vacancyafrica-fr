import { Component } from '@angular/core'
import { PushNotificationService, PushNotificationOptions } from 'src/app/services/push-notification.service';
import { AuthService } from 'src/app/services/auth.service';
import { CrudService } from 'src/app/shared/service/crud.service';

@Component({
  selector: 'cui-topbar-home-menu',
  templateUrl: './home-menu.component.html',
  styleUrls: ['./home-menu.component.scss'],
})
export class TopbarHomeMenuComponent {
  relatedAds: any;
  userName: any;
  badgeCount: number;

  constructor( public service: CrudService, public authService: AuthService, private _pushNotificationService: PushNotificationService) {
    let  userInfo = this.authService.user;
    if (userInfo !== null && userInfo !== undefined) {
      this.userName = userInfo.displayName || userInfo.firstName + ' ' + userInfo.lastName || 'Anonymous'
      if (userInfo.userRoles !== null && userInfo.userRoles !== undefined) {
      } else{
      this._pushNotificationService.requestPermission();
        this.checkSubscriptions(userInfo.jobCategory);
      }
    }
  }

  checkSubscriptions(categories) {
    console.log(categories)
    this.service.getWithParams('/advert/get-by-category' , categories).subscribe(
      result => {
        this.badgeCount = result.length
        this.relatedAds = result;
        console.log(this.relatedAds)
        if (this.relatedAds !== null && this.relatedAds.length > 0) {
          // this.pushNotification(result);
        }
      },
      error => {
        console.log(error.error);
      }
    );
  }

  pushNotification(value) {
    const title = 'Hello ' + this.userName;
    const options = new PushNotificationOptions();
    options.body = value.length + ' Jobs match your category, apply now!!';

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
}
