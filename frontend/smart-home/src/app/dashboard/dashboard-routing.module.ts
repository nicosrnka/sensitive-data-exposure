import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ControlComponent } from './control/control.component';
import {CreateComponent} from './create/create.component'
import { DashboardComponent } from './dashboard.component';
import { HouseInfoComponent } from './house-info/house-info.component';
import { InfoComponent } from './info/info.component';
import { ReactiveFormsModule } from '@angular/forms';
const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', component: DashboardComponent },
      { path: 'control', component: ControlComponent },
      { path: 'info', component: InfoComponent },
      { path: 'houseinfo', component: HouseInfoComponent },
      { path : 'create', component:CreateComponent}
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), ReactiveFormsModule],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
