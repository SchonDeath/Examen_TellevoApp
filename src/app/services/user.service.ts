import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, addDoc, doc, docData, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { User } from './user';
import { Observable } from 'rxjs';
import { Auth } from '@angular/fire/auth';
import { Storage,ref,getDownloadURL,uploadString} from '@angular/fire/storage';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private firestore: Firestore,
    private auth: Auth,
    private storage:Storage) { }

  getUserProfile()
  {
    const user = this.auth.currentUser;
    const userDocRef = doc(this.firestore, `users/${user?.uid}`);
    return docData(userDocRef);
  }

  getUsers(): Observable<User[]> {
    const usersRef = collection(this.firestore, 'users');
    return collectionData(usersRef, {idField:'id'}) as Observable<User[]>;
  }

  getUserById(id:string): Observable<User> {
    const userRef = doc(this.firestore,`users/${id}`);
    return docData(userRef,{idField:'id'}) as Observable<User>;
  }
  
  updateUser(user: User){
    const userRef = doc(this.firestore,`user/${user.id}`);
    return updateDoc(userRef,
      {
        name:user.name,
        lastname:user.lastname,
        age:user.age,
        email:user.email,
        phone:user.phone,
        university:user.university,
        city:user.city
      });
  }

  deleteUser(user:User){
    const userRef = doc(this.firestore,`user/${user.id}`);
    return deleteDoc(userRef) ;
  }
}






