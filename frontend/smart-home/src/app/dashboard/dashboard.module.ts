import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { InfoComponent } from './info/info.component';
import { ControlComponent } from './control/control.component';
import { HouseInfoComponent } from './house-info/house-info.component';


@NgModule({
  declarations: [DashboardComponent, InfoComponent, ControlComponent, HouseInfoComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
