import { Component } from '@angular/core';
import { CollectionReference, DocumentData, Firestore, collection, doc, getDoc } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent {

  usersCollection: CollectionReference<DocumentData>;
  userID: any;
  currentUser: User = new User();

  constructor(private route: ActivatedRoute, private firestore: Firestore) {
    this.usersCollection = collection(firestore, 'users');
    this.route.paramMap.subscribe(paramMap => {
      this.userID = paramMap.get('id');
      this.getUser();
    })
  }

  async getUser() {
    const docRef = doc(this.usersCollection, this.userID);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("User data:", docSnap.data());
      this.currentUser = new User(docSnap.data());
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  }
}
