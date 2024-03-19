import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { UserService } from '../../services/user.service';
import { UserAuthService } from '../../services/user-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private userAuthService: UserAuthService,
    private router: Router
  ) {}

  loginForm: FormGroup = this.fb.group({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  submit() {
    if (this.loginForm.valid) {
      this.userService.login(this.loginForm.value).subscribe({
        next: (data: any) => {
          //console.log(data);
          this.userAuthService.setRoles(data.user.roles);
          this.userAuthService.setToken(data.accessToken);

          const role = data.user.roles[0];
          console.log(role.name);
          if (role.name === 'Admin') {
            this.router.navigate(['/']);
          } else if (role.name === 'BookAdmin') {
            this.router.navigate(['/book']);
          } else if (role.name === 'CateAdmin') {
            this.router.navigate(['/category']);
          } else if (role.name === 'User') {
            this.router.navigate(['/users']);
          }
        },
        error: (e) => console.error(e),
        complete: () => console.info('complete'),
      });
    }
  }
}
