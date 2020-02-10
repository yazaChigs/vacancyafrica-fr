import { NgModule } from '@angular/core'
import { SharedModule } from 'src/app/shared.module'
import { LayoutRouterModule } from './layout-routing.module'

// layout
import { LayoutBootstrapComponent } from 'src/app/layouts/pages/layout/bootstrap/bootstrap.component'
import { LayoutCardComponent } from 'src/app/layouts/pages/layout/card/card.component'
import { LayoutMailTemplatesComponent } from 'src/app/layouts/pages/layout/mail-templates/mail-templates.component'
import { LayoutTypographyComponent } from 'src/app/layouts/pages/layout/typography/typography.component'
import { LayoutUtilitiesComponent } from 'src/app/layouts/pages/layout/utilities/utilities.component'

const COMPONENTS = [
  LayoutBootstrapComponent,
  LayoutCardComponent,
  LayoutMailTemplatesComponent,
  LayoutTypographyComponent,
  LayoutUtilitiesComponent,
]

@NgModule({
  imports: [SharedModule, LayoutRouterModule],
  declarations: [...COMPONENTS],
})
export class LayoutModule {}
