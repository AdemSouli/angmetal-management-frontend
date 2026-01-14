import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private router: Router) { }

  roles: string = ""

  canActivate() {
    this.roles = sessionStorage.getItem("roles") || ""
    if (!this.roles.includes("ADMIN")) {
      this.router.navigate(["home"]);
      return false;
    }
    return true;
  }
}