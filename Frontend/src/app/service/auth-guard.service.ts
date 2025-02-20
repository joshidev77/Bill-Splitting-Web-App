import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { StorageTokenService } from './StorageToken.service';
import { StorageKeys } from '../Enums/enum';


@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

    constructor(private router: Router,private StorageService:StorageTokenService) { }
    canActivate() {
        const token = sessionStorage.getItem(StorageKeys.TOKEN)
        if (token) {
            this.router.navigate(['/Home'])
            return false
        }
        return true
    }
}
