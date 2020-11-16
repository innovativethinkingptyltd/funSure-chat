import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {CheckMenu} from './services/check-menu/check-menu.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Messages',
      url: '/messages',
      icon: 'assets/icons/chat.svg'
    },
    // {
    //   title: 'Tickets',
    //   url: '/tickets',
    //   icon: 'assets/icons/ticket.svg'
    // },
    // {
    //   title: 'Users',
    //   url: '/users',
    //   icon: 'assets/icons/user.svg'
    // },
    {
      title: 'Settings',
      url: '/settings',
      icon: 'assets/icons/user.svg'
    }
  ];
  showMenu:boolean;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private checkMenu: CheckMenu
  ) {
    this.initializeApp();
    this.showMenu = true;
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.getCheckMenu();
    });
  }
  getCheckMenu() {
    this.checkMenu.show.subscribe(menu => {
      console.log('triggered...')
      this.showMenu = menu;
      console.log(menu)
    });
  }
  ngOnInit() {
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }
}
