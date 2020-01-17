import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateFormComponent } from './createForm/createForm.component';
import { DynamicFormBuilderComponent } from './dynamic-form-builder/dynamic-form-builder.component';
const routes: Routes = [
  {
    path: '',
    component: DynamicFormBuilderComponent,
    data: { title: 'Available Forms' },
  },
  {
    path: 'view',
    component: DynamicFormBuilderComponent,
    data: { title: 'Available Forms' },
  },
  {
    path: 'new',
    component: CreateFormComponent,
    data: { title: 'New Form' },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormsRoutingModule {}
