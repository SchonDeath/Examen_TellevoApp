import { Injectable } from '@angular/core';
import { collectionData, docData, Firestore } from '@angular/fire/firestore';
import { addDoc, collection, deleteDoc, doc, updateDoc, query, where } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { Pasajero } from './pasajeros';

@Injectable({
  providedIn: 'root'
})
export class PasajerosService {

  constructor(private firestore: Firestore) { }

  getPasajeros(): Observable<Pasajero[]> {
    const pasajeroRef = collection(this.firestore,'pasajeros');
    const queryRef = query(pasajeroRef,where('estado','==','pendiente'));
    return collectionData(queryRef, {idField: 'id'}) as Observable<Pasajero[]>;
  }

  getPasajeroById(id:string): Observable<Pasajero>{
    const pasajeroRef = doc(this.firestore,`pasajeros/${id}`);
    return docData(pasajeroRef,{ idField: 'id'}) as Observable<Pasajero>;
  }

  addPasajero(pasajero: Pasajero){
    const pasajeroRef = collection(this.firestore, 'pasajeros');
    return addDoc(pasajeroRef,pasajero);
  }

  updatePasajero(pasajero: Pasajero){
    const pasajeroRef = doc(this.firestore,`pasajeros/${pasajero.id}`);
    return updateDoc(pasajeroRef, 
      { 
        name: pasajero.name, 
        lastname: pasajero.lastname,  
        direccion: pasajero.direccion,
        destino: pasajero.destino,
        tipodepago: pasajero.tipodepago,
        estado: pasajero.estado
      });
  }

  deletePasajero(pasajero: Pasajero){
    const pasajeroRef = doc(this.firestore,`pasajeros/${pasajero.id}`);
    return deleteDoc(pasajeroRef);
  }


}
