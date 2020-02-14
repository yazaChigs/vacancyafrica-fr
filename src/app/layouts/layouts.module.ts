import { NgModule } from '@angular/core'
import { SharedModule } from '../shared.module'
import { LayoutModule } from '../components/LayoutComponents/layout.module'

import { LayoutLoginComponent } from './Login/login.component'
import { LayoutMainComponent } from './Main/main.component'
import { LayoutPublicComponent } from './Public/public.component'
import { SiteManagerModule } from './pages/site-manager/site.module'
import { LogoComponent } from './pages/site-manager/company/logo/logo.component';
import { AngularCropperjsModule } from 'angular-cropperjs'

const COMPONENTS = [LayoutLoginComponent, LayoutMainComponent, LayoutPublicComponent]

@NgModule({
  imports: [SharedModule, LayoutModule, AngularCropperjsModule],
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS],
})
export class LayoutsModule {}
