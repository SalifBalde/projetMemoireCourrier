import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { AuthService } from 'src/app/proxy/auth/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `]
})
export class LoginComponent implements OnInit{

    form!: FormGroup;
  error: boolean =false

    constructor(
        public layoutService: LayoutService,
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authService: AuthService,
    ) { }

    ngOnInit() {
         this.form = this.formBuilder.group({
             username: ['', Validators.required],
            password: ['', Validators.required]
         });
    }

    get f() { return this.form.controls; }

    valCheck: string[] = ['remember'];

    password!: string;

    login(){
         this.authService.login(this.form.value.username,this.form.value.password)
        .subscribe({
            next: (res: any) => {
             // localStorage.setItem("token", res.access_token);
              this.authService.saveToken(res.access_token);
              this.authService.saveRefreshToken(res.refresh_token);

              this.router.navigate(['/home']);
            },
         error: (err) => {
               this.error=true
             },
             complete: ()=> console.info('complete')
           });
    }


}
