import { registerLocaleData } from '@angular/common';
import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { doc, setDoc } from 'firebase/firestore';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth:Auth, private firestore:Firestore) { }

  async register(email:string,password:string){
    try {
      const user = await createUserWithEmailAndPassword(this.auth, email,password);
      return user;
    } catch (error) {
      return null;
    }
  }

  updateUser(userInfo: Object) {
    console.log(userInfo)
    const user = this.auth.currentUser;
    const userDocRef = doc(this.firestore, `users/${user?.uid}`);
    return setDoc(userDocRef, {
        name: userInfo['name'],
        lastname: userInfo['lastname'],
        email: userInfo['email'],
        address: userInfo['address'],
        region: userInfo['region'],
        campus: userInfo['campus']
      }, { merge: true })
    
  }

  async login(email:string,password:string){
    try {
      const user = await signInWithEmailAndPassword(this.auth, email,password);
      return user;
    } catch (error) {
      return null;
    }
  }

  logout(){
    return signOut(this.auth);
  }
  async getUid(){
   const user = await this.auth.currentUser;
   if(user){
    return user.uid;
   }
   else{
    return null;
   }
   
  }
}
