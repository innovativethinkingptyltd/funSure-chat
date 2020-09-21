import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllTicketsPageRoutingModule } from './all-tickets-routing.module';

import { AllTicketsPage } from './all-tickets.page';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllTicketsPageRoutingModule,
    NgxDatatableModule
  ],
  declarations: [AllTicketsPage]
})
export class AllTicketsPageModule {}
