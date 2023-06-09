import { Injectable } from '@angular/core';
import { Firestore, collection, getDocs, getFirestore, setDoc } from "firebase/firestore";
import { doc, getDoc } from "firebase/firestore";
import { Manga } from 'src/app/models/manga';
import { FirebaseService } from '../firebase/firebase.service';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {



   db:Firestore;


  constructor(private firebaseServ:FirebaseService) {
    this.db = getFirestore(this.firebaseServ.app);
  }

  getManga(id:string):Promise<Manga | null>{
    const docRef = doc(this.db, "manga", id);
    return getDoc(docRef).then(document => {
      if (document.exists()) {
        return { id: document.id, ...document.data() as Manga}
      }
      else{
        return null;
      }
    });


  }
    getMangas(): Promise<Manga[]>{
      const collectionRef = collection(this.db, 'manga');
      return getDocs(collectionRef).then(col => {
        return col.docs.map(doc => ({id: doc.id, ...doc.data()} as Manga))
      })
    }

  getUser(id:string):Promise<User | null>{
    const docRef = doc(this.db, "users", id);
    return getDoc(docRef).then(document => {
      if (document.exists()) {
        return { id: document.id, ...document.data() as User}
      }
      else{
        return null;
      }
    });
  }

  saveUser(user:any){
    const docRef = doc(this.db, "users", user.uid)
    return setDoc(docRef, {email: user.email})
      .then(() => console.log("utente salvato"))
      .catch((err) => console.log(err))
  }


}
