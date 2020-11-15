import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'sign-in',
    pathMatch: 'full'
  },
  {
    path: 'messages',
    loadChildren: () => import('./messages/messages.module').then( m => m.MessagesPageModule)
  },
  {
    path: 'tickets',
    loadChildren: () => import('./tickets/tickets.module').then( m => m.TicketsPageModule)
  },
  {
    path: 'all-tickets',
    loadChildren: () => import('./all-tickets/all-tickets.module').then( m => m.AllTicketsPageModule)
  },
  {
    path: 'sign-in',
    loadChildren: () => import ('./sign-in/sign-in.module').then(m => m.SignInPageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import ('./settings/settings.module').then(m => m.SettingsModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
