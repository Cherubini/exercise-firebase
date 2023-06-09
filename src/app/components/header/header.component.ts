import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  user?: User;


  constructor(private auth:AuthService) {
  }

  ngOnInit(): void {
    this.auth.userSubject.subscribe({
      next: user => this.user = user as User,
      error: err => console.log(err),

    })
  }

  signIn(){
      this.auth.signIn()
  }

  signOut(){
      this.auth.signOut();
    }
}
