import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common'
import { Firestore, doc, getDoc, getFirestore } from '@angular/fire/firestore';
import { initializeApp } from 'firebase/app';
import { User } from '../models/user.class';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';
import { DialogEditAddressComponent } from '../dialog-edit-address/dialog-edit-address.component';
import { deleteDoc } from "firebase/firestore";
import { TooltipPosition } from '@angular/material/tooltip';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  positionOptions: TooltipPosition[] = ['below', 'above', 'left', 'right'];
  position = new FormControl(this.positionOptions[1]);
  firestore: Firestore = inject(Firestore);
  app = initializeApp(this.firestore.app.options);
  db = getFirestore(this.app);
  docRef: any;
  userId: any;
  user: User = new User();
  docSnap: any;

  constructor(private route: ActivatedRoute, private location: Location, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      this.userId = paramMap.get('id');
      console.log('the user id is', this.userId);
      this.getUser();
    })
  }

  async getUser() {
    this.docRef = doc(this.db, "users", this.userId);
    this.docSnap = await getDoc(this.docRef);
    this.user = this.docSnap.data();
    console.log('retrieved user', this.user);
  }

  editMenuUserDetail() {
    const dialog = this.dialog.open(DialogEditUserComponent);
    dialog.componentInstance.user = new User(this.user);
    dialog.componentInstance.userId = this.userId;
  }

  editMenu() {
    const dialog = this.dialog.open(DialogEditAddressComponent);
    dialog.componentInstance.user = new User(this.user);
    dialog.componentInstance.userId = this.userId;
  }

  goBackToUserList() {
    this.location.back();
  }

  async deleteUser() {
    this.docRef = doc(this.db, "users", this.userId);
    await deleteDoc(this.docRef);
    this.goBackToUserList();
  }
}
