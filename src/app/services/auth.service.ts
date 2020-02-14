import { Injectable } from '@angular/core'
import { auth } from 'firebase/app'
import { AngularFireAuth } from '@angular/fire/auth'
import { AngularFirestore } from '@angular/fire/firestore'
import { Router } from '@angular/router'
import { NzNotificationService } from 'ng-zorro-antd'
import { AuthenticateService } from '../auth/authenticate.service'
import { TokenStorage } from '../auth/token.storage'
import { NgxPermissionsService } from 'ngx-permissions'

interface User {
  uid: string
  email: string
  displayName: string
  photoURL: string
  emailVerified: boolean
  role: string
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router, private permissionsService: NgxPermissionsService,
    private authenticateService: AuthenticateService,
    private notification: NzNotificationService,
    private token: TokenStorage
  ) {
    // this.afAuth.authState.subscribe(user => {
    //   if (user) {
    //     this.userData = user
    //     localStorage.setItem('user', JSON.stringify(this.userData))
    //   } else {
    //     localStorage.setItem('user', null)
    //   }
    // })
  }

  async SignInVisitor(userName: string, password: string) {
    await this.authenticateService.attemptAuthVisitor(userName, password).subscribe(
      data=> {
        // console.log(data)
        this.token.signOut();
        // this.token.saveToken(data.token);
        this.token.saveUser(JSON.stringify(data));
        this.token.saveUserType(JSON.stringify('VISITOR'));
        // this.token.saveRoles(JSON.stringify(this.loadRoles(data.visitor.userRoles)));
        this.router.navigate(['/dashboard']);
        this.notification.success(
          'Logged In',
          'You have successfully Logged In',
        );
      },
      error => {
        console.log(error);
        this.notification.error('Oooooops', 'Failed to Login?');
      }
    );
  }

  async SignIn(userName: string, password: string) {
    await this.authenticateService.attemptAuth(userName, password).subscribe(
      data => {
        console.log(data)
        this.token.saveToken(data.token);
        this.token.saveUser(JSON.stringify(data.user));
        if (data.company !== null && data.company !== undefined) {
          sessionStorage.setItem('C_DETAILS', JSON.stringify(data.company));
        }
        this.setCompany(data.user);
        this.token.saveRoles(JSON.stringify(this.loadRoles(data.user.userRoles)));
        // this.permissionsService.loadPermissions(this.loadRoles(data.user.userRoles));
        if (this.roles().includes('ROLE_GLOBAL')) {
          // this.router.navigate(['/dashboard/alpha']);
          this.router.navigate(['/site-manager']);
        } else {
          if(data.user.company!== null) {
            sessionStorage.setItem('COMPANY', data.company.id);
            sessionStorage.setItem('C_NAME', data.company.name);
            // sessionStorage.setItem('C_DETAILS', JSON.stringify(data.user.company));
            // window.location.reload();
          }

          this.router.navigate(['/dashboard']);
        }
        this.notification.success(
              'Logged In',
              'You have successfully Logged In',
            );
      },
       error => {
         console.log(error);
         this.notification.error('Oooooops', 'Failed to Login?');
       }
    );
  }

  setCompany(value) {
    sessionStorage.setItem('COMPANY', value.companyId);
    sessionStorage.setItem('C_NAME', value.companyName);
    }

    get user(): any {
      const user = JSON.parse(this.token.getUser());
      return user;
    }

    get visitor(): any {
      const user = JSON.parse(this.token.getUser());
      return user;
    }

    public roles(): Array<string> {
      const r = JSON.parse(this.token.getRoles());
      return r;
    }

    private loadRoles(roles: Array<any>): Array<string> {
      const array: Array<string> = [];
      roles.forEach(element => {
         array.push(element.name);
      });
      return array;
   }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'))
    return user !== null
  }

  async SignOut() {
    this.token.signOut();
    // this.router.navigate(['login']);
    // await this.afAuth.auth.signOut()
    localStorage.removeItem('user')
    // this.router.navigate(['user/login'])
  }
}
