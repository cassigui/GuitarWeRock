import { Component } from '@angular/core';

import { Platform, MenuController,ModalController } from '@ionic/angular';

import { UserService } from './modules/account/users/user.service';
import { MenuItems } from './side-menu';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  appPages: any[];
  _isLogged: boolean = false;
  url_s3: string;

  constructor(
    private platform: Platform,
    public userService: UserService,
    private modal_controller: ModalController,
    private menuCtrl: MenuController,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.url_s3 = this.userService.url_s3;
      this.menuCtrl.enable(false);
      this.listenSession();
    });
  }

  listenSession() {
    this.userService._userAllow.subscribe(
      (data: any) => {
        this._isLogged = data;
        this.menuCtrl.enable(data);
        this.build_menu(data);
      }
    )
  }

  async build_menu(value: boolean) {
    let menuItems = [];
    if (value) {
      for (let menuItem of MenuItems) {
        if (menuItem.category == '' || menuItem.category == 'dashboard' || (this.userService.user && this.userService.user.super_admin)) {
          menuItems.push(menuItem);
          continue;
        }
        for (let p of this.userService.user.access_level.permissions) {
          if (p.category.type == menuItem.category && p.type == 'view' && p.pivot && p.pivot.allow == true) {
            menuItems.push(menuItem);
          }
        }
      }
    }
    this.appPages = menuItems;
  }

  logoff() {
    this.build_menu(false);
    this.userService.logout();
  }

}
