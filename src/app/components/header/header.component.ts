import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnDestroy{
  isLogged:boolean=false;
  users:Subject<User[]| null> = new Subject();


  constructor(public auth:AuthService) {
    console.log('isLogged: ', this.isLogged);
  }

  ngOnDestroy(): void {
    this.auth.signOut();
  }

  signInOut(){
    if(!this.isLogged){
      this.auth.signIn()
    }
    else{
      this.auth.signOut();
    }
    this.isLogged = !this.isLogged;
    console.log(this.isLogged);

  }
}
