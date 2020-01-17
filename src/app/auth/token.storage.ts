import { Injectable } from '@angular/core';


const TOKEN_KEY = 'AuthToken';
const USER_KEY = 'UserData';
const ROLE_KEY = 'RoleData';

@Injectable()
export class TokenStorage {

  constructor() { }

  signOut() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    sessionStorage.removeItem('C_DETAILS');
    sessionStorage.clear();
    localStorage.clear();
  }
  public saveToken(token: string) {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.setItem(TOKEN_KEY,  token);
  }
  public saveRoles(roles: string) {
    localStorage.removeItem(ROLE_KEY);
    localStorage.setItem(ROLE_KEY,  roles);
  }
  public saveUser(user: any) {
    localStorage.removeItem(USER_KEY);
    localStorage.setItem(USER_KEY,  user);
  }

  public getToken(): string {
    return localStorage.getItem(TOKEN_KEY);
  }
  public getUser(): any {
    return localStorage.getItem(USER_KEY);
  }
  public getRoles(): any {
    return localStorage.getItem(ROLE_KEY);
  }
  public allRoles(): Array<string> {
    const r = JSON.parse(this.getRoles());
    return r;
  }
}
