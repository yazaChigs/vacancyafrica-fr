import { Component, OnInit, Input } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { filter } from 'rxjs/operators';
import * as _ from 'lodash';
import { select, Store } from '@ngrx/store';
import { MenuService } from 'src/app/services/menu.service';
import * as SettingsActions from 'src/app/store/settings/actions';
import * as Reducers from 'src/app/store/reducers';
import { CompanyService } from 'src/app/shared/service/company.service';
import { NzNotificationService } from 'ng-zorro-antd';
import { AuthenticateService } from 'src/app/auth/authenticate.service';
import { TokenStorage } from 'src/app/auth/token.storage';
import { NgxPermissionsService } from 'ngx-permissions';

@Component({
  selector: 'cui-menu-left',
  templateUrl: './menu-left.component.html',
  styleUrls: ['./menu-left.component.scss'],
})
export class MenuLeftComponent implements OnInit {
  @Input() isMenuCollapsed = false;
  isLightTheme: boolean;
  isSettingsOpen: boolean;
  isMobileView: boolean;
  menuData: any[];
  adminMenuData: any[];
  menuDataActivated: any[];
  adminMenuDataActivated: any[];
  company = sessionStorage.getItem('COMPANY');
  companyName = sessionStorage.getItem('C_NAME');
  isCompanySelected = false;
  menuTemp: any[]
  inputValue: string;
  filteredOptions: any[] = [];
  options = [];
  roles: Array<string>;
  constructor(
    private menuService: MenuService,
    private store: Store<any>,
    private router: Router,
    private service: CompanyService,
    private notification: NzNotificationService,
    private token: TokenStorage,
    private permissionsService: NgxPermissionsService,
  ) {
    this.permissionsService.loadPermissions(this.token.allRoles());
    this.roles = this.token.allRoles();
    if ( this.company !== null && this.company !== undefined ) {
      this.isCompanySelected = true;
    }
  }

  ngOnInit() {


   // this.menuService.getLeftMenuData().subscribe(menuData => (this.menuData = menuData));
   this.menuService.getLeftMenuData().subscribe(menuData => {
    if(this.company !== null && this.company !== undefined && this.company !== 'null') {
    this.menuTemp = menuData;
    if (this.roles.includes('ROLE_GLOBAL')) {
      this.menuData = menuData;
    }
    if (!this.roles.includes('ROLE_ADMIN') && this.roles.includes('ROLE_USER')) {
      this.menuTemp = this.menuTemp.filter(t => t.key !== 'administration');
      this.menuData = this.menuTemp.filter(t => t.key !== 'companyForms');
    }
    if (this.roles.includes('ROLE_ADMIN') && !this.roles.includes('ROLE_GLOBAL')) {
      this.menuData = this.menuTemp.filter(t => t.key !== 'forms');
    }
    if (this.roles.includes('ROLE_USER') && !this.roles.includes('ROLE_GLOBAL') && !this.roles.includes('ROLE_ADMIN')) {
      this.menuTemp = this.menuTemp.filter(t => t.key !== 'administration');
      this.menuData = this.menuTemp.filter(t => t.key !== 'forms');
    }
  }
  });
   this.store.pipe(select(Reducers.getSettings)).subscribe(state => {
      this.isLightTheme = state.isLightTheme;
      this.isMobileView = state.isMobileView;
    });
   this.activateMenu(this.router.url);
   this.router.events
      .pipe(filter(event => event instanceof NavigationStart))
      .subscribe((event: NavigationStart) => {
        this.activateMenu(event.url ? event.url : null);
      });
   this.getCompanies();
  }


  activateMenu(url: any, menuData = this.menuData) {
    if(this.company !== null && this.company !== undefined && this.company !== 'null') {
    menuData = JSON.parse(JSON.stringify(menuData));
    const pathWithSelection = this.getPath({ url }, menuData, (entry: any) => entry, 'url');
    if (pathWithSelection) {
      pathWithSelection.pop().selected = true;
      _.each(pathWithSelection, (parent: any) => (parent.open = true));
    }
    this.menuDataActivated = menuData.slice();
  }
  }

  getPath(
    element: any,
    source: any,
    property: any,
    keyProperty = 'key',
    childrenProperty = 'children',
    path = [],
  ) {
    let found = false;
    const getElementChildren = (value: any) => _.get(value, childrenProperty);
    const getElementKey = (value: any) => _.get(value, keyProperty);
    const key = getElementKey(element);
    return (
      _.some(source, (e: any) => {
        if (getElementKey(e) === key) {
          path.push(e);
          return true;
        } else {
          return (found = this.getPath(
            element,
            getElementChildren(e),
            property,
            keyProperty,
            childrenProperty,
            path.concat(e),
          ));
        }
      }) &&
      (found || _.map(path, property))
    );
  }

  toggleSettings() {
    this.store.dispatch(
      new SettingsActions.SetStateAction({
        isSettingsOpen: !this.isSettingsOpen,
      }),
    );
  }

  onInput(value: string): void {
    this.filteredOptions = this.options.filter(option => option.name.toLowerCase().indexOf(value.toLowerCase()) === 0);
  }
  selectCompany(value) {
  sessionStorage.setItem('COMPANY', value.id);
  sessionStorage.setItem('C_NAME', value.name);
  sessionStorage.setItem('C_DETAILS', JSON.stringify(value));
  window.location.reload();
  }
  getCompanies() {
    this.service.getAll().subscribe(
      result => {
        this.options = result;
        this.filteredOptions = result;
      },
      error => {
        this.notification.error('Error Encountered', error.message);
      },
    );
  }

}
