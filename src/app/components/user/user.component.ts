import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {

  dbUser: any;

  constructor(private firestore:FirestoreService, private auth:AuthService){
    this.auth.userSubject.subscribe({
      next: user => {
        if(user){
          this.firestore.getUser(user.uid).then(dbUser => {this.dbUser = dbUser; console.log('dbuser ', this.dbUser);});


        }
      },
      error: err => console.log(err),
    });
  }
}
