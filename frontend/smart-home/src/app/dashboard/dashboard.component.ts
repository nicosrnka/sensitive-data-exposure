import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(private auth: AuthGuard, private router : Router) {}

  ngOnInit(): void {}

  logout() {
    this.auth.logout();
    this.router.navigate(["/login"]);
  }
}
