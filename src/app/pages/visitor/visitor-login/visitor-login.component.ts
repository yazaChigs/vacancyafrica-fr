import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { VisitorSigninComponent } from '../visitor-signin/visitor-signin.component';
import { NzDrawerService } from 'ng-zorro-antd';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-visitor-login',
  templateUrl: './visitor-login.component.html',
  styleUrls: ['./visitor-login.component.scss']
})
export class VisitorLoginComponent implements OnInit {
  visitorLoginForm:FormGroup
  backgroundNumber = 1
  fullScreen = false
  validateForm: FormGroup
  visible = false;
  childrenVisible = false;
  vegetables = ['asparagus', 'bamboo', 'potato', 'carrot', 'cilantro', 'potato', 'eggplant'];

  constructor(private fb: FormBuilder, public authService: AuthService,
    private drawerService: NzDrawerService,
    ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({})
    this.visitorLoginForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required]],
    })
  }

  changeBackground(): void {
    if (this.backgroundNumber === 5) {
      this.backgroundNumber = 1
    } else {
      this.backgroundNumber += 1
    }
  }

  changeScreen(): void {
    this.fullScreen = !this.fullScreen
  }
  openChildren(): void {
    this.childrenVisible = true;
  }

  closeChildren(): void {
    this.childrenVisible = false;
  }

  openSignIn() {
    const drawerRef = this.drawerService.create<VisitorSigninComponent, { value: string }, string>({
      // nzTitle: 'REGISTER',
      nzWidth:600,
      nzContent: VisitorSigninComponent,
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



get userName() {
  return this.visitorLoginForm.controls.userName
}
get password() {
  return this.visitorLoginForm.controls.password
}

submitForm(): void {
  this.userName.markAsDirty()
  this.userName.updateValueAndValidity()
  this.password.markAsDirty()
  this.password.updateValueAndValidity()
  if (this.userName.invalid || this.password.invalid) return
  this.authService.SignInVisitor(this.userName.value, this.password.value)

}
  }

