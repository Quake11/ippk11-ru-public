import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { trigger, transition, style, animate } from '@angular/animations';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('fade', [
      transition(':enter', [
        style({ opacity: 0.8, transform: 'scale(0.8)' }),
        animate('150ms', style({ opacity: 1, transform: 'scale(1)' }))
      ])
    ])
  ]
})
export class LoginComponent implements OnInit {
  user$: Observable<any>;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.user$ = this.authService.user$;
  }

  async googleLogin() {
    await this.authService.googleLogin();
    // this.router.navigate(['/']);
  }

  async signOut() {
    await this.authService.signOut();
    // this.router.navigate(['/']);
  }

  printUser($event) {
    console.log($event);
  }

  printError($event) {
    console.log($event);
  }
}
