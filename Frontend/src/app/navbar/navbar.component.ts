import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(private router: Router, private userService : UserService ) {}

  ngOnInit(): void {}

    logout() {
      this.userService.logout();
    }
 
}
