import { Component } from '@angular/core'
import { AuthService } from 'src/app/services/auth.service'
import { Router } from '@angular/router'
import { VisitorLoginComponent } from '../../../../layouts/pages/visitor/visitor-login/visitor-login.component';
import { NzDrawerService, NzNotificationService } from 'ng-zorro-antd';
import { Global } from '../../../../global';
import { TokenStorage } from '../../../../auth/token.storage';
import { CrudService } from '../../../../shared/service/crud.service';
import { PushNotificationOptions, PushNotificationService } from 'src/app/services/push-notification.service';
const TOKEN_KEY = 'AuthToken';
const USER_KEY = 'UserData';
const ROLE_KEY = 'RoleData';
const USER_TYPE = 'UserType';
@Component({
  selector: 'cui-topbar-profile-menu',
  templateUrl: './profile-menu.component.html',
  styleUrls: ['./profile-menu.component.scss'],
})




export class TopbarProfileMenuComponent {

  badgeCount: number = 7
  userName: string
  billingPlan: string
  email: string
  phone: string
  role: string
  haveToLogin = false;
  imageLink = ''
  relatedAds: any;

  constructor(
    private router: Router,
    private drawerService: NzDrawerService, private notification: NzNotificationService, public global: Global,
    public authService: AuthService, private token: TokenStorage, public service: CrudService,
     private _pushNotificationService: PushNotificationService) {
    let  userInfo = this.authService.user;
    if (userInfo !== null && userInfo !== undefined) {

      this.userName = userInfo.displayName || userInfo.firstName + ' ' + userInfo.lastName || 'Anonymous'
    this.billingPlan = 'Professional'
    this.email = userInfo.userName
    this.phone = userInfo.phoneNumber || '-'
    this.role = JSON.stringify(this.authService.roles) || 'applicant'

    if (userInfo.userRoles !== null && userInfo.userRoles !== undefined) {
      this.imageLink = this.global.baseUrl  + '/api/user/logo/' + userInfo.id;
    } else{
      this.imageLink = this.global.baseUrl  + '/api/visitor/logo/' + userInfo.id;
      }

    } else {
      this.imageLink = ''
        this.haveToLogin = true
    }
  }

  badgeCountIncrease() {
    this.badgeCount = this.badgeCount + 1
  }



  pushNotification(value) {
    const title = 'Hello ' + this.userName;
    const options = new PushNotificationOptions();
    options.body = value.length +' Jobs match your category, apply now!!';

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

  adminLogin() {
    this.authService.SignOut()
    this.router.navigate(['user/login'])
  }

  logout() {
    let  userInfo = this.authService.user;
    if (userInfo.userRoles !== null && userInfo.userRoles !== undefined) {
      this.authService.SignOut()
    this.router.navigate(['/dashboard'])
    this.haveToLogin = true
    } else if (userInfo.userType === 'VISITOR') {
      this.authService.SignOut()
    this.router.navigate(['/dashboard'])
    this.haveToLogin = true
    // location.reload()
      // this.openComponent();
    } else {
      this.notification.error('Error Encountered', 'No User Logged in!');
      // location.reload();
    }
  }
  logouClient() {
    this.openComponent()
    if(this.authService.user !== null && this.authService.user !== null) {
      this.haveToLogin = false
      this.router.navigate(['/dashboard'])

    }
  }

  editUserProfile() {
    let  userInfo = this.authService.user;
      if(userInfo.userRoles!== null && userInfo.userRoles!== undefined) {
      this.router.navigate(['/users']);
    } else {
      this.router.navigate(['/visitor/edit']);
    }
  }

  openComponent(): void {
    const drawerRef = this.drawerService.create<VisitorLoginComponent, { value: string }, string>({
      // nzTitle: 'REGISTER',
      nzWidth:700,
      nzContent: VisitorLoginComponent,
      // nzContentParams: {
      //   value: this.value
      // }
    });

    drawerRef.afterOpen.subscribe(() => {
      console.log('Drawer(Component) open');
    });

    drawerRef.afterClose.subscribe(data => {
      console.log(data);
      // if (typeof data === 'string') {
      //   this.value = data;
      // }
    });

  }
}
