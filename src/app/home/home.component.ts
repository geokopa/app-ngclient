import { Component, OnInit } from '@angular/core';
import { first } from "rxjs/operators";
import { User } from '../models/user';
import { AuthenticationService } from '../services/authentication.service';
import { UserService  } from "../services/user.service";



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  currentUser: User;
  loading = false;
  users: User[];

  constructor(private userService: UserService, private authenticationService: AuthenticationService) { 
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    // console.log(this.currentUser);
  }

  ngOnInit(): void {
    this.loading =true;
    this.userService.getAll().pipe(first()).subscribe(users => {
      this.loading =false;
      this.users = users;
    });
  }

}
