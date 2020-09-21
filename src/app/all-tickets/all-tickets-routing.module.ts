import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllTicketsPage } from './all-tickets.page';

const routes: Routes = [
  {
    path: '',
    component: AllTicketsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllTicketsPageRoutingModule {}
