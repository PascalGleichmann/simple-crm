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
  allUsers: any;
  unsubUsers: any;

  constructor(public dialog: MatDialog, private firestore: Firestore) {
    this.usersCollection = collection(firestore, 'users');
    const q = query(this.usersCollection)
    this.getAllUsers(q);
  }

  getAllUsers(queryCollection: any) {
    this.unsubUsers = onSnapshot(queryCollection, (querySnapshot: any) => {
      this.allUsers = [];
      querySnapshot.forEach((doc: any) => {
        const user = doc.data();
        user['customId'] = doc.id;
        this.allUsers.push(user)
      });
    })
  }

  ngonDestroy() {
    this.unsubUsers();
  }

  openDialog() {
    this.dialog.open(DialogAddUserComponent);
  }


}
