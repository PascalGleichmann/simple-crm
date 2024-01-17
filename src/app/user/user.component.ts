import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { CollectionReference, DocumentData, Firestore, collection, doc, getDocs, onSnapshot, query } from '@angular/fire/firestore';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  usersCollection: CollectionReference<DocumentData>;
  users: any;
  unsubUsers;

  constructor(public dialog: MatDialog, private firestore: Firestore) {
    this.usersCollection = collection(firestore, 'users');
    const q = query(this.usersCollection)
    this.unsubUsers = onSnapshot(q, (querySnapshot) => {
      this.users = [];
      querySnapshot.forEach((doc) => {
        this.users.push(doc.data())
      });
      console.log("Current users: ", this.users);
    })
  }

  ngonDestroy() {
    this.unsubUsers();
  }

  openDialog() {
    this.dialog.open(DialogAddUserComponent);
  }


}
