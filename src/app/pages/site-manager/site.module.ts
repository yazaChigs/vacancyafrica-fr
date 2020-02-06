import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SiteManagerRoutingModule } from './site-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CleanUIModule } from 'src/app/components/CleanUIComponents/cleanui.module';
import { JobCategoriesComponent } from './access/job-categories/job-categories.component';
@NgModule({
  imports: [SiteManagerRoutingModule, FormsModule, ReactiveFormsModule, SharedModule, CleanUIModule],
  declarations: [DashboardComponent],
})
export class SiteManagerModule {}
