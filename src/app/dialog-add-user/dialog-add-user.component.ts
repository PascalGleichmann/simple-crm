import { Component } from '@angular/core';
import { CollectionReference, DocumentData, Firestore, addDoc, collection } from '@angular/fire/firestore';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss']
})
export class DialogAddUserComponent {
  user: User = new User();
  birthDate!: Date;
  usersCollection: CollectionReference<DocumentData>;

  constructor(firestore: Firestore) {
    this.usersCollection = collection(firestore, 'users');
  }

  saveUser() {
    this.user.birthDate = this.birthDate.getTime();
    addDoc(this.usersCollection, this.user.toJSON())
      .then(() => {
        console.log('Follwoing user was added:', this.user);
      });
  }
}

