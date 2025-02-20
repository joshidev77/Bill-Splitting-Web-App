import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { StorageTokenService } from './StorageToken.service';

@Injectable({
  providedIn: 'root'
})
export class ProtectedAuthGuardService implements CanActivate {

    constructor(private router: Router, private StorageService: StorageTokenService) { }
    canActivate() {
        const token = this.StorageService.getToken()
        if (!token) {
            this.router.navigate([''])
            return false
        }
        return true
    }

}
