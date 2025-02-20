import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';
import { StorageTokenService } from '../../service/StorageToken.service';

@Component({
    selector: 'app-logout',
    standalone: true,
    imports: [RouterLink],
    templateUrl: './logout.component.html',
    styleUrl: './logout.component.scss'
})
export class LogoutComponent {

    // isToggled
    isToggled = false;

    constructor(
        public themeService: CustomizerSettingsService, private StorageService: StorageTokenService
    ) {
        this.themeService.isToggled$.subscribe(isToggled => {
            this.isToggled = isToggled;
        });
    }

    logout() {
        this.StorageService.removeToken()
        console.log('user logged out');
    }

}
