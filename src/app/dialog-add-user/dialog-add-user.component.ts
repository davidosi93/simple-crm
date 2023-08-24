import { Component, OnInit, inject } from '@angular/core';
import { User } from '../models/user.class';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss'],
})
export class DialogAddUserComponent implements OnInit {
  firestore: Firestore = inject(Firestore);
  userCollection = collection(this.firestore, 'users');
  user: User = new User();
  birthDate!: Date;
  loading = false;

  constructor(public dialogRef: MatDialogRef<DialogAddUserComponent>) {
  }

  ngOnInit() {

  }

  saveUser() {
    this.user.birthDate = this.birthDate.getTime();
    console.log('Current user is', this.user);
    this.loading = true;
    addDoc(this.userCollection, this.user.toJSON())
      .then(result => {
        this.loading = false;
        console.log("Adding user finished", result);
        this.dialogRef.close();
      })
  }
}
