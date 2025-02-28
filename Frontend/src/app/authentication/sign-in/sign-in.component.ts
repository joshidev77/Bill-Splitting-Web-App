import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';
import { NgClass } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Validators } from 'ngx-editor';
import { StorageTokenService } from '../../service/StorageToken.service';
import { APIURL } from '../../env';



@Component({
    selector: 'app-sign-in',
    standalone: true,
    imports: [RouterLink, NgClass, ReactiveFormsModule],
    templateUrl: './sign-in.component.html',
    styleUrl: './sign-in.component.scss'
})
export class SignInComponent {

    isToggled = false;
    isPasswordVisible: boolean = false;
    isConfirmPasswordVisible: boolean = false;
    formData: FormGroup

    constructor(public themeService: CustomizerSettingsService, private httpClient: HttpClient, private fb: FormBuilder, private router: Router, private StorageService: StorageTokenService) {
        this.themeService.isToggled$.subscribe(isToggled => {
            this.isToggled = isToggled;
        });
    }

    ngOnInit(): void {
        this.formData = this.fb.group({
            Email: [''],
            Password: ['', [Validators.required, Validators.minLength(8)]]
        })
    }
    togglePasswordVisibility(): void {
        this.isPasswordVisible = !this.isPasswordVisible;
    }
    toggleConfirmPasswordVisibility(): void {
        this.isConfirmPasswordVisible = !this.isConfirmPasswordVisible;
    }

    spinner = false
    onLogin() {
        this.spinner = true
        setTimeout(() => {
            this.spinner = false;
            const url = `${APIURL}/login`
            const requestbody = {
                email: this.formData.get('Email')?.getRawValue(),
                password: this.formData.get('Password')?.getRawValue(),
            }
            this.httpClient.post(url, requestbody).subscribe((res: any) => {
                this.spinner = true
                this.StorageService.setToken(res.token)
                this.formData.reset()

                this.router.navigate(['/Home'])
            }, (error) => {
                if (error.status === 401) {
                    this.toggleClass3()
                    this.formData.reset()
                }
            })
        }, 1000);
    }


    classApplied2 = false;
    classApplied3 = false;
    toggleClass2() {
        this.classApplied2 = !this.classApplied2;
    }
    toggleClass3() {
        this.classApplied3 = !this.classApplied3;
    }
}
