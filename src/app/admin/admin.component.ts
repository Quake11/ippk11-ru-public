import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  isAdmin$: Observable<boolean>;
  constructor(private auth: AuthService) {
    this.isAdmin$ = this.auth.isAdmin$;
  }

  ngOnInit() {}
}
