import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar'
import { SharedModule } from 'src/app/shared.module'
import { ChartistModule } from 'ng-chartist'

import { TopbarComponent } from './Topbar/topbar.component'
import { TopbarBitcoinPriceComponent } from './Topbar/BitcoinPrice/bitcoin-price.component'
import { TopbarHomeMenuComponent } from './Topbar/HomeMenu/home-menu.component'
import { TopbarIssuesHistoryComponent } from './Topbar/IssuesHistory/issues-history.component'
import { TopbarLiveSearchComponent } from './Topbar/LiveSearch/live-search.component'
import { TopbarProfileMenuComponent } from './Topbar/ProfileMenu/profile-menu.component'
import { TopbarProjectManagementComponent } from './Topbar/ProjectManagement/project-management.component'
import { MenuLeftComponent } from './Menu/MenuLeft/menu-left.component'
import { MenuTopComponent } from './Menu/MenuTop/menu-top.component'
import { FooterComponent } from './Footer/footer.component'
import { BreadcrumbsComponent } from './Breadcrumbs/breadcrumbs.component'
import { SettingsComponent } from './Settings/settings.component'
import { VisitorLoginComponent } from '../../pages/visitor/visitor-login/visitor-login.component';
import { VisitorSigninComponent } from '../../pages/visitor/visitor-signin/visitor-signin.component';

const COMPONENTS = [
  TopbarComponent,
  TopbarBitcoinPriceComponent,
  TopbarHomeMenuComponent,
  TopbarIssuesHistoryComponent,
  TopbarLiveSearchComponent,
  TopbarProfileMenuComponent,
  TopbarProjectManagementComponent,
  MenuLeftComponent,
  MenuTopComponent,
  FooterComponent,
  VisitorLoginComponent, VisitorSigninComponent,
  BreadcrumbsComponent,
  SettingsComponent,
]

@NgModule({
  imports: [SharedModule, FormsModule, ReactiveFormsModule, PerfectScrollbarModule, ChartistModule],
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS],
  entryComponents: [VisitorLoginComponent, VisitorSigninComponent],
})
export class LayoutModule {}
