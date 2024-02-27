import { Component } from '@angular/core';
import { CollectionReference, DocumentData, Firestore, collection, doc, getDoc, onSnapshot } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/models/user.class';
import { DialogEditAddressComponent } from '../dialog-edit-address/dialog-edit-address.component';
import { DialogEditHeaderComponent } from '../dialog-edit-header/dialog-edit-header.component';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent {

  usersCollection: CollectionReference<DocumentData>;
  userID: any;
  user: User = new User();

  constructor(public dialog: MatDialog, private route: ActivatedRoute, private firestore: Firestore) {
    this.usersCollection = collection(firestore, 'users');
    this.route.paramMap.subscribe(paramMap => {
      this.userID = paramMap.get('id');
      this.getUser();
    })
  }

  getUser() {
    const unsub = onSnapshot(doc(this.usersCollection, this.userID), (doc) => {
      this.user = new User(doc.data());
    });
  }

  editHeader() {
    let dialog = this.dialog.open(DialogEditHeaderComponent);
    dialog.componentInstance.user = new User(this.user.toJSON());
    dialog.componentInstance.userID = this.userID;
  }

  editAddress() {
    let dialog = this.dialog.open(DialogEditAddressComponent);
    dialog.componentInstance.user = new User(this.user.toJSON());
    dialog.componentInstance.userID = this.userID;
  }
}
