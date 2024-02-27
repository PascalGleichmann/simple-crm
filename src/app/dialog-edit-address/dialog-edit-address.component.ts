import { Component } from '@angular/core';
import { CollectionReference, DocumentData, Firestore, addDoc, collection, doc, setDoc } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-dialog-edit-address',
  templateUrl: './dialog-edit-address.component.html',
  styleUrls: ['./dialog-edit-address.component.scss']
})
export class DialogEditAddressComponent {
  user: User = new User();
  loading = false;
  userID: any;
  usersCollection: CollectionReference<DocumentData>;

  constructor(public dialogRef: MatDialogRef<DialogEditAddressComponent>, private firestore: Firestore) {
    this.usersCollection = collection(firestore, 'users');
  }

  saveUser() {
    this.loading = true;
    const docRef = doc(this.usersCollection, this.userID);
    setDoc(docRef, this.user.toJSON())
      .then(() => {
        this.loading = false;
        this.dialogRef.close()
      });
  }
}
