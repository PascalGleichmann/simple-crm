import { Component } from '@angular/core';
import { CollectionReference, DocumentData, Firestore, addDoc, collection, doc, setDoc } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-dialog-edit-header',
  templateUrl: './dialog-edit-header.component.html',
  styleUrls: ['./dialog-edit-header.component.scss']
})
export class DialogEditHeaderComponent {
  user: User = new User();
  birthDate!: Date;
  loading = false;
  userID: any;
  usersCollection: CollectionReference<DocumentData>;

  constructor(public dialogRef: MatDialogRef<DialogEditHeaderComponent>, private firestore: Firestore) {
    this.usersCollection = collection(firestore, 'users');
  }

 saveUser() {
    this.user.birthDate = this.birthDate.getTime();
    this.loading = true;
    const docRef = doc(this.usersCollection, this.userID);
    setDoc(docRef, this.user.toJSON())
      .then(() => {
        this.loading = false;
        console.log('Follwoing user data was updated:', this.user);
        this.dialogRef.close()
      });
  }
}
