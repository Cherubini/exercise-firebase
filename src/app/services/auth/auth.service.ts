import { Injectable } from '@angular/core';
import { Auth, GoogleAuthProvider, User, getAuth, onAuthStateChanged, signInWithPopup, signOut  } from 'firebase/auth';
import { FirebaseService } from '../firebase/firebase.service';
import { Subject } from 'rxjs';
import { FirestoreService } from '../firestore/firestore.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService{

  auth: Auth;
  provider:any;
  userSubject: Subject<User | null> = new Subject();


  constructor(private firebase:FirebaseService, private firestore:FirestoreService)  {
    // Initialize Firebase Authentication and get a reference to the service
    this.auth = getAuth(this.firebase.app);
    this.provider = new GoogleAuthProvider();
    onAuthStateChanged(this.auth, async (user) => {
      if (user) {
        const uid = user.uid;
        const dbUser= await firestore.getUser(uid);

        if(!dbUser){
          this.firestore.saveUser(user);
        }


        this.userSubject.next(user);
        console.log('usersubject', this.userSubject);

      } else {
        // User is signed out
        // ...
        console.log('nessuno è loggato');
        this.userSubject.next(user);
        console.log('usersubject', this.userSubject);

      }
    });

  }

  signIn(){
    signInWithPopup(this.auth, this.provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential!.accessToken;
      // The signed-in user info.
      const user:User = result.user;
      // IdP data available using getAdditionalUserInfo(result)
      // // ...

      console.log(user);

    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
      console.log(errorMessage);

    });
  }

  signOut(){
    signOut(this.auth).then(() => {
      // Sign-out successful.
      console.log('sign out?');

    }).catch((error) => {
      // An error happened.
    });
  }

}
