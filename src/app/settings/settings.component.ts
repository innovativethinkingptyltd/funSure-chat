import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { CheckMenu } from '../services/check-menu/check-menu.service';
import { ToastService } from '../services/toast/toast.service';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {

  constructor(
    private check: CheckMenu,
    private storage: Storage,
    private router: Router,
    private toast: ToastService
  ) { }

  ngOnInit() {
    this.check.showMenu();
  }
  logOut()  {
    this.storage.clear().then(() => { {
      this.router.navigate(['sign-in']).then(() => {
        this.toast.show('logged out');
      });
    }});
  }

}
