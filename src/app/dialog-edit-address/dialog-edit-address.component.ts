import { Component, OnInit, inject } from '@angular/core';
import { User } from '../models/user.class';
import { MatDialogRef } from '@angular/material/dialog';
import { Firestore, collection, doc, getFirestore, updateDoc } from '@angular/fire/firestore';
import { initializeApp } from 'firebase/app';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dialog-edit-address',
  templateUrl: './dialog-edit-address.component.html',
  styleUrls: ['./dialog-edit-address.component.scss']
})
export class DialogEditAddressComponent implements OnInit {
  user!: User;
  loading = false;
  firestore: Firestore = inject(Firestore);
  app = initializeApp(this.firestore.app.options);
  db = getFirestore(this.app);
  dbRef = collection(this.db, "users");
  userId: any;
  docRef: any;
  docSnap: any;
  updateData: any;

  constructor(public dialogRef: MatDialogRef<DialogEditAddressComponent>, private router: Router) { }

  ngOnInit(): void { }

  saveUser() {
    this.loading = true;
    this.docRef = doc(this.db, "users", this.userId);
    this.updateData = this.user.toJSON();
    updateDoc(this.docRef, this.updateData)
      .then(() => {
        this.dialogRef.close();
        this.loading = false;
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/']);
          this.router.navigate([`/user/${this.userId}`]);
        });
      })
  }
}
