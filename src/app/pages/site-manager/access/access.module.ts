import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CleanUIModule } from 'src/app/components/CleanUIComponents/cleanui.module';
import { AccessRoutingModule } from './access-routing.module';
import { ModulesComponent } from './modules/modules.component';
import { RolesComponent } from './roles/roles.component';
import { PermissionsComponent } from './permissions/permissions.component';
import { SharedComponentModule } from 'src/app/components/shared/shared.component.module';
@NgModule({
  imports: [AccessRoutingModule, FormsModule, ReactiveFormsModule, SharedModule, CleanUIModule, SharedComponentModule],
  declarations: [ModulesComponent, RolesComponent, PermissionsComponent],
})
export class AccessModule {}
